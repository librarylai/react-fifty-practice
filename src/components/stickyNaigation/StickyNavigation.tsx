import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

import { Link } from 'react-router-dom'

interface StyledProps {
  isActive?: boolean
}
const StickyNavigationContainer = styled.nav<StyledProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${({ isActive }) => (isActive ? '#fff' : '#222')};
  transition: all 0.3s ease-in-out;
  box-shadow: ${({ isActive }) => (isActive ? '0 2px 10px rgba(0, 0, 0, 0.3)' : '')};
	z-index: 999;
`
const NavContainer = styled.nav<StyledProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ isActive }) => (isActive ? '10px 0px' : '20px 0px')};
  transition: all 0.3s ease-in-out;
`
const NavUl = styled.ul`
  display: flex;
  list-style-type: none;
  align-items: center;
  justify-content: center;
`
const LinkStyled = styled(Link)<StyledProps>`
  color: ${({ isActive }) => (isActive ? '#222' : '#fff')};
  text-decoration: none;
  padding: 6px 15px;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: #c0392b;
    font-weight: bold;
  }
`
const Logo = styled.h1<StyledProps>`
  color: ${({ isActive }) => (isActive ? '#222' : '#fff')};
  padding: 6px 15px;
`

export interface IStickyNaigationProps {}

export default function StickyNaigation(props: IStickyNaigationProps) {
  const [isActive, setIsActive] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const fixNav = () => {
		if (!navRef.current) return
    if (window.scrollY > navRef.current.offsetHeight + 150) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }
  useEffect(() => {
		window.addEventListener('scroll', fixNav)
		return ()=>{
			window.removeEventListener('scroll', fixNav)
		}
  }, [])
  return (
    <StickyNavigationContainer isActive={isActive} ref={navRef}>
      <NavContainer>
        <Logo isActive={isActive}>My Website</Logo>
        <NavUl>
          <li>
            <LinkStyled isActive={isActive} to='/ExpandingCards'>
              ExpandingCards
            </LinkStyled>
          </li>
          <li>
            <LinkStyled isActive={isActive} to='/ScrollAnimation'>
              ScrollAnimation
            </LinkStyled>
          </li>
          <li>
            <LinkStyled isActive={isActive} to='/RotatingNavigation'>
              RotatingNavigation
            </LinkStyled>
          </li>
          <li>
            <LinkStyled isActive={isActive} to='/BlurryLoading'>
              BlurryLoading
            </LinkStyled>
          </li>
          <li>
            <LinkStyled isActive={isActive} to='/HiddenSearchWidget'>
              HiddenSearchWidget
            </LinkStyled>
          </li>
          <li>
            <LinkStyled isActive={isActive} to='/StepsPage'>
              StepsPage
            </LinkStyled>
          </li>
        </NavUl>
      </NavContainer>
    </StickyNavigationContainer>
  )
}
