import React, { useState } from 'react'

import styled from 'styled-components'
import useInterval from '@/hook/useInterval'

type styledProps = {
  percentage: number
}

const BlurryLoadingPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`
const Bg = styled.div<styledProps>`
  background-image: url('https://picsum.photos/id/249/3000/3000');
  width: calc(100% + 90px); // 消除 blur 白邊
  height: calc(100% + 90px); // 消除 blur 白邊
  position: absolute;
  left: -60px; // 消除 blur 白邊
  top: -60px; // 消除 blur 白邊
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  filter: ${({ percentage }) => (percentage ? `blur(${100 - percentage}px)` : `blur(100px)`)};
`
const LoadingText = styled.p`
  font-size: 3rem;
  font-weight: bold;
  color: #fff;
`
interface Props {}

const BlurryLoadingPage = (props: Props) => {
  const [load, setLoad] = useState(0)

  // 描述每个间隔状态
  useInterval(
    () => {
      setLoad(load + 1)
    },
    load >= 100 ? null : 30
  )

  return (
    <BlurryLoadingPageContainer>
      <Bg percentage={load}></Bg>
      <LoadingText>{`${load}%`}</LoadingText>
    </BlurryLoadingPageContainer>
  )
}

export default BlurryLoadingPage
