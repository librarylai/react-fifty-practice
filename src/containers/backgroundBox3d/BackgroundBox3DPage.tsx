import React, { useState } from 'react'

import styled from 'styled-components'

const IMAGE_CONTAINER_SIZE = 500

const BackgroundBox3DPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Button = styled.button`
  background-color: #f9ca24;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  padding: 12px 20px;
  box-shadow: 0 5px 2px rgba(249, 202, 36, 0.5);
  margin-bottom: 20px;
  &:active {
    box-shadow: none;
    transform: translateY(-2px);
  }
`

const BoxsWrapper = styled.div<{ isSpread: boolean }>`
  width: 100%;
  height: 100%;
  width: ${({ isSpread }) => (isSpread ? '600px' : '500px')};
  height: ${({ isSpread }) => (isSpread ? '600px' : '500px')};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  transition: 0.3s ease;
`
const ImgBox = styled.div<{ isSpread: boolean }>`
  background-color: yellow;
  width: 125px;
  height: 125px;
  transition: 0.3s ease;
  ${({ isSpread }) => {
    if (isSpread) {
      return {
        transform: 'rotateZ(360deg)',
      }
    }
  }}
  background-image: url('https://memeprod.ap-south-1.linodeobjects.com/user-gif-thumbnail/eb4e861fd45a3a55cd2683ab47231d49.gif');
  background-size: ${IMAGE_CONTAINER_SIZE}px ${IMAGE_CONTAINER_SIZE}px;
  background-repeat: no-repeat;
  position: relative;
  &::after {
    content: '';
    background-color: #fbd859;
    position: absolute;
    bottom: -8px;
    right: -15px;
    width: 15px;
    height: 100%;
    transform: skewY(45deg);
  }
  &::before {
    content: '';
    background-color: #917614;
    position: absolute;
    bottom: -15px;
    left: 8px;
    width: 100%;
    height: 15px;
    transform: skewX(45deg);
  }
`

const BackgroundBox3DPage = () => {
  const [isSpread, setIsSpread] = useState(false)

  const renderImageBoxes = (rate: number = 4) => {
    const mapping = Array.from({ length: rate }, (_, row) => Array.from({ length: rate }, (_, column) => ({ row, column }))).flat()
    return mapping.map(({ row, column }, i) => {
      return (
        <ImgBox
          key={`${row}-${column}`}
          isSpread={isSpread}
          style={{ backgroundPosition: `-${column * (IMAGE_CONTAINER_SIZE / rate)}px -${row * (IMAGE_CONTAINER_SIZE / rate)}px` }}
        ></ImgBox>
      )
    })
  }

  return (
    <BackgroundBox3DPageContainer>
      <Button onClick={() => setIsSpread(!isSpread)}>點我旋轉</Button>
      <BoxsWrapper isSpread={isSpread}>{renderImageBoxes()}</BoxsWrapper>
    </BackgroundBox3DPageContainer>
  )
}

export default BackgroundBox3DPage
