import React, { useEffect, useRef, useState } from 'react'

import styled from 'styled-components'
import useIsSsr from '@/hook/useIsSsr'

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

interface Props {}

const ScrollAnimationPage = (props: Props) => {
	const [isSsr] = useIsSsr()
	const initVisibleHeight = isSsr ? 900 : (window.innerHeight / 5) * 4
	const [boxesTop, setBoxesTop] = useState<Array<number>>([])
	const boxRefs = useRef<Array<HTMLDivElement>>([])
	const count = 10
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
	}, [isSsr])

	function checkShowBox(index: number) {
		if (boxesTop[index] > 0 && boxesTop[index] < initVisibleHeight) return true
		return false
	}
	// render box
	function renderScrollBox() {
		let arr = [...new Array(count)].map((_, index) => index + 1)
		return arr.map((item, index) => {
			return (
				<ScrollableBox
					ref={(el: HTMLDivElement) => (boxRefs.current[index] = el)}
					isShow={checkShowBox(index)}
					key={item}
				>
					{item}
				</ScrollableBox>
			)
		})
	}
	return <ScrollAnimationPageContainer>{renderScrollBox()}</ScrollAnimationPageContainer>
}

export default ScrollAnimationPage