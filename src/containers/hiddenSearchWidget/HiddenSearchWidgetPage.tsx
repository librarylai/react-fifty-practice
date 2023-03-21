import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { flatten } from 'lodash'

console.log('flatten', flatten)
const Background = styled.div`
  background-image: linear-gradient(90deg, #7d5fff, #7158e2);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
`
const HiddenSearchWidgetContainer = styled.div`
  position: relative;
  height: 50px;
`
const SearchInput = styled.input<{ isOpen: boolean }>`
  background-color: #fff;
  border: 0;
  font-size: 18px;
  padding-left: 15px;
  height: 50px;
  width: ${({ isOpen }) => (isOpen ? '200px' : '50px')};
  transition: width 0.3s ease;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`
const SearchButton = styled.button<{ isOpen: boolean }>`
  background-color: #fff;
  border: 0;
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  width: 50px;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => isOpen && 'translateX(198px)'};
  &:focus {
    outline: none;
  }
`

export interface IHiddenSearchWidgetProps {}

function HiddenSearchWidgetPage(props: IHiddenSearchWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const InputRef = useRef<HTMLInputElement>(null)
  function handelToggleOpen() {
    setIsOpen(!isOpen)
    if (InputRef.current) InputRef.current.focus()
  }
  return (
    <Background>
      <HiddenSearchWidgetContainer>
        <SearchInput ref={InputRef} isOpen={isOpen} />
        <SearchButton onClick={handelToggleOpen} isOpen={isOpen}>
          <FontAwesomeIcon icon={faSearch} />
        </SearchButton>
      </HiddenSearchWidgetContainer>
    </Background>
  )
}

export default HiddenSearchWidgetPage
