import React, { useEffect, useRef, useState } from 'react'
import { RootState, useAppDispatch } from '@/store/store'
import { cleanNewsData, fetchNewsAPI } from '@/store/slice/newsSlice'

import { IServerSideProps } from '@/interface/GeneralInterface'
import styled from 'styled-components'
import useIsSsr from '@/hook/useIsSsr'
import { useSelector } from 'react-redux'

const ScrollAnimationPageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #efedd6;
	flex-direction: column;
	overflow: hidden;
`
const ScrollableBox = styled.div<{ isShow: boolean | undefined }>`
	background-color: steelblue;
	color: white;
	font-size: 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 400px;
	height: 200px;
	border-radius: 10px;
	box-shadow: 2px 4px 5px #222;
	margin: 10px;
	transform: ${({ isShow }) => (isShow ? ` translateX(0%)` : `translateX(200%)`)};
	transition: transform 0.4s ease;
	&:nth-of-type(even) {
		transform: ${({ isShow }) => (isShow ? ` translateX(0%)` : `translateX(-200%)`)};
	}
`

interface Props {
	serverSideProps?: []
}

const ScrollAnimationPage = ({serverSideProps}: Props) => {
	const [isSsr] = useIsSsr()
	const initVisibleHeight = isSsr ? 900 : (window.innerHeight / 5) * 4
	const [boxesTop, setBoxesTop] = useState<Array<number>>([])
	const boxRefs = useRef<Array<HTMLDivElement>>([])
	const dispatch = useAppDispatch()
	const newsData = useSelector((state: RootState) => state.news.newsData)
	// componentDidMount 與 componentWillUnMount
	useEffect(() => {
		dispatch(fetchNewsAPI())
		return () => {
			dispatch(cleanNewsData())
		}
	}, [dispatch])
	// 檢查是否要顯是 box
	useEffect(() => {
		const handleScrollHight = () => {
			if (!boxRefs.current.length) return
			let newBoxesTop: number[] = boxRefs.current.map((box: HTMLDivElement) => {
				return box?.getBoundingClientRect().top || 999
			})
			setBoxesTop(newBoxesTop)
		}
		handleScrollHight()
		!isSsr && window.addEventListener('scroll', handleScrollHight)
		return () => {
			!isSsr && window.removeEventListener('scroll', handleScrollHight)
		}
	}, [newsData, isSsr])

	function checkShowBox(index: number) {
		if (boxesTop[index] > 0 && boxesTop[index] < initVisibleHeight) return true
		return false
	}
	// render ScrollBox
	function renderScrollBox() {
		if (!newsData.length) return
		return newsData.map((item, index) => {
			return (
				<ScrollableBox
					ref={(el: HTMLDivElement) => (boxRefs.current[index] = el)}
					isShow={checkShowBox(index)}
					key={index}
				>
					{item.title}
				</ScrollableBox>
			)
		})
	}
	return <ScrollAnimationPageContainer>{renderScrollBox()}</ScrollAnimationPageContainer>
}
// 給 Server Side 呼叫
async function getServerSideProps(context: IServerSideProps) {
	// context 是來自 server 端傳進來的 ex. req ,res, redux store....
	const { store } = context
	store.dispatch(fetchNewsAPI())
	return {
		props: {
			test: '我我來自 server side',
		},
	}
}

ScrollAnimationPage.getServerSideProps = getServerSideProps
export default ScrollAnimationPage
