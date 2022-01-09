import React, { useEffect, useRef, useState } from 'react'
import { RootState, useAppDispatch } from '@/store/store'
import { cleanNewsData, fetchNewsAPI,fetchEnNewsAPI } from '@/store/slice/newsSlice'

import { IReactComponent, IServerSideContext, IServerSideProps } from '@/interface/GeneralInterface'
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
  font-size: 1.5rem;
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
  serverSideProps?: Array<IServerSideProps | null>
}

const ScrollAnimationPage: IReactComponent<Props> = ({ serverSideProps }) => {
  console.log('serverSideProps',serverSideProps)
  const [isSsr] = useIsSsr()
  const initVisibleHeight = isSsr ? 900 : (window.innerHeight / 5) * 4
  const [boxesTop, setBoxesTop] = useState<Array<number>>([])
  const boxRefs = useRef<Array<HTMLDivElement>>([])
  const dispatch = useAppDispatch()
  const newsData = useSelector((state: RootState) => state.news.newsData)
  console.log('newsData',newsData)
  // componentDidMount 與 componentWillUnMount
  useEffect(() => {
    console.log('in useEffect',serverSideProps)
    if(serverSideProps && serverSideProps?.length > 0) return
    console.log('call api')
    dispatch(fetchNewsAPI())
    return () => {
      dispatch(cleanNewsData())
    }
  }, [dispatch,serverSideProps])
  
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
    return newsData.map((item:{title:string}, index:number) => {
      return (
        <ScrollableBox ref={(el: HTMLDivElement) => (boxRefs.current[index] = el)} isShow={checkShowBox(index)} key={index}>
          {item.title}
        </ScrollableBox>
      )
    })
  }
  return <ScrollAnimationPageContainer>{renderScrollBox()}</ScrollAnimationPageContainer>
}
// 給 Server Side 呼叫
async function getServerSideProps(context: IServerSideContext) {
  // context 是來自 server 端傳進來的 ex. req ,res, redux store....
  const { store } = context
  await store.dispatch(fetchEnNewsAPI())
  // const response = await axios.get(
	// 	'https://newsapi.org/v2/everything?q=tesla&from=2021-12-08&sortBy=publishedAt&apiKey=41a1d4035b60422a931ed0f23b95e320'
  // )
	// console.log('response',response)
  return {
    props: {
      test: '我我來自 server side',
    },
  }
}

ScrollAnimationPage.getServerSideProps = getServerSideProps
export default ScrollAnimationPage
