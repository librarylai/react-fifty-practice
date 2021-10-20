import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
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
  transform: translateX(200%);
  transition: transform 0.4s ease;
  &::nth-of-type(even) {
    transform: translateX(-200%);
  }
  ${({ isShow }) => {
    if (isShow) return ` transform: translateX(0%)`
  }}
`

interface Props {}

const ScrollAnimationPage = (props: Props) => {
    const initVisibleHeight = (window.innerHeight / 5) * 4
  const [scrollHeight, setScrollHeight] = useState<number>(initVisibleHeight)
  const boxRefs = useRef<Array<HTMLDivElement | null>>([])
  const count = 10
  console.log('scrollHeight', scrollHeight)
  // 檢查是否要顯是 box
  useEffect(() => {
    const handleScrollHight = () => {
        console.log('aa',window.scrollY)
        setScrollHeight(initVisibleHeight + window.scrollY)
    }
    window.addEventListener('scroll', handleScrollHight)
    return () => {
      window.removeEventListener('scroll', handleScrollHight)
    }
  },[scrollHeight])

  function checkShowBox(index: number) {
    if (!boxRefs || !boxRefs.current[index]) return false
    let boxTop = boxRefs.current[index]?.getBoundingClientRect().top
    if (boxTop && boxTop < scrollHeight) return true
  }
  // render box
  function renderScrollBox() {
    let arr = [...new Array(count)].map((_, index) => index + 1)
    return arr.map((item, index) => {
      return (
        <ScrollableBox ref={(el) => (boxRefs.current[index] = el)} isShow={checkShowBox(index)} key={item}>
          {item}
        </ScrollableBox>
      )
    })
  }
  return <ScrollAnimationPageContainer>{renderScrollBox()}</ScrollAnimationPageContainer>
}

export default ScrollAnimationPage
