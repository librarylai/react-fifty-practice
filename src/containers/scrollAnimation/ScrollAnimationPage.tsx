import { IReactComponent, IServerSideContext, IServerSideProps } from '@/interface/GeneralInterface'
import React, { useEffect, useRef, useState } from 'react'
import { RootState, useAppDispatch } from '@/store/store'
import { cleanNewsData, fetchEnNewsAPI, fetchNewsAPI } from '@/store/slice/newsSlice'

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
  transform: ${({ isShow }) => (isShow ? ` translateX(0%)` : `translateX(500%)`)};
  transition: transform 0.4s ease;
  &:nth-of-type(even) {
    transform: ${({ isShow }) => (isShow ? ` translateX(0%)` : `translateX(-500%)`)};
  }
`

interface Props {
  serverSideProps?: Array<IServerSideProps | null>
}

const ScrollAnimationPage: IReactComponent<Props> = ({ serverSideProps }) => {
  const [isSsr] = useIsSsr()
  const initVisibleHeight = isSsr ? 900 : (window.innerHeight / 5) * 4
  const [boxesTop, setBoxesTop] = useState<Array<number>>([])
  const boxRefs = useRef<Array<HTMLDivElement>>([])
  const dispatch = useAppDispatch()
  const newsData = useSelector((state: RootState) => state.news.newsData)
  // componentDidMount 與 componentWillUnMount
  useEffect(() => {
    // 簡單判斷如果是來自於 前端 切換近來的話，就呼叫ＡＰＩ 
    // 如果來自於 Server Side， newsData 會在 Server 端 preload 時就有值
    if (newsData.length === 0) {
      dispatch(fetchNewsAPI())
    }
    // 離開 component 時清除 ( 做 componentWillUnMount 效果 )
    return () => {
      dispatch(cleanNewsData())
    }
  }, [])

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
    return newsData.map((item: { title: string }, index: number) => {
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
  // 等待 獲取資料 塞到 store 
  await store.dispatch(fetchEnNewsAPI())
  return {
    props: {
      test: '我我來自 server side',
    },
  }
}

ScrollAnimationPage.getServerSideProps = getServerSideProps
export default ScrollAnimationPage
