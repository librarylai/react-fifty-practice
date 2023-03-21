import styled, { css } from 'styled-components'

import React from 'react'
import { flatten } from 'lodash'

console.log('flatten', flatten)
// -- styled component props types ----------------------------------------------------------------- //
export interface StyledPanelProps {
  imgUrl?: String
  isOpen: boolean
}
export interface PanelComponentPropsType {
  data: {
    name: string
    url: string
  }[]
  handlePanelClick(index: number): void
  openIndex: number
}

const PanelContainer = styled.div`
  display: flex;
  width: 90vw;
`
const StyledPanel = styled.div<StyledPanelProps>`
  flex: ${({ isOpen }) => (isOpen ? 10 : 0.5)};
  height: 80vh;
  border-radius: 50px;
  background-size: cover;
  background-position: center;
  margin: 10px;
  position: relative;
  transition: flex 0.5s ease-in;
  cursor: pointer;
  background-image: ${({ imgUrl }) => `url('${imgUrl}')`};
`
const panelActive = css`
  transition: 0.3s ease-in-out;
  transition-delay: 0.5s;
`
const PanelFont = styled.p<StyledPanelProps>`
  color: #fff;
  text-shadow: 0px 0px 10px #999;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  font-size: 30px;
  ${({ isOpen }) => {
    if (isOpen) return panelActive
  }}
`
const Panel = ({ data, handlePanelClick, openIndex }: PanelComponentPropsType) => {
  function renderPanel() {
    return data.map((item, index) => {
      let isOpen = openIndex === index
      return (
        <StyledPanel key={index} isOpen={isOpen} onClick={() => handlePanelClick(index)} imgUrl={item.url}>
          <PanelFont isOpen={isOpen}>{item.name}</PanelFont>
        </StyledPanel>
      )
    })
  }
  return <PanelContainer>{renderPanel()}</PanelContainer>
}

Panel.propTypes = {}

export default Panel
