import React, { useState } from 'react'

import styled from 'styled-components'

interface StyledProps {
  currentIndex?: number
  isOpen?: boolean
}

const Background = styled.div`
  min-height: 100vh;
  background-color: #222;
	position: 'relative';
	box-sizing: border-box;
`
const RotatingNavigationPageContainer = styled.div<StyledProps>`
  width: 100vw;
  min-height: 100vh;
  background-color: #6c98bd;
  transition: transform 0.3s linear;
  padding: 50px;
  transform-origin: top left;
  box-sizing: border-box;
  transform: ${({ isOpen }) => (isOpen ? `rotate(-20deg)` : '')};
`
const CircleContainer = styled.div`
  position: absolute;
  top: -100px;
  left: -100px;
`
const Circle = styled.div<StyledProps>`
  background-color: #ff7979;
  cursor: pointer;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: relative;
  transition: transform 0.3s linear;
  transform: ${({ isOpen }) => (isOpen ? `rotate(-70deg)` : '')};
`
const Button = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100px;
  background-color: transparent;
  border: none;
  font-size: 26px;
  font-weight: bold;
  color: #fff;
  &:focus {
    outline: none;
  }
`
const OpenButton = styled(Button)`
  left: 60%;
`
const CloseButton = styled(Button)`
  top: 60%;
  transform: rotate(90deg);
  transform-origin: top left;
`
const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 50px auto;
`
const StyledTitle = styled.h1`
  margin: 0;
`
const SmallText = styled.small`
  font-style: italic;
  color: #555;
`
const Content = styled.p`
  color: #333;
  line-height: 1.5;
`
const Image = styled.img`
  max-width: 100%;
`
const NavMenu = styled.nav`
  position: fixed;
  left: 0px;
  bottom: 40px;
`
const MenuList = styled.ul`
  list-style-type: none;
`

const MenuItem = styled.li<StyledProps>`
  color: #fff;
  margin: 40px 0px;
  transform: ${({ isOpen }) => (isOpen ? `translateX(0)` : `translateX(-500% )`)};
  transition: transform 0.4s ease-in;
  transition-delay: ${({ isOpen }) => isOpen && '0.1s'};
  margin-left: ${({ currentIndex }) => currentIndex && `${currentIndex * 15}px`};
`
export interface IRotatingNavigationPageProps {}

function RotatingNavigationPage(props: IRotatingNavigationPageProps) {
  const [isShowNavMenu, setIsShowNavMenu] = useState(true)
  const MENU_DATA = [
    {
      name: 'Home',
    },
    {
      name: 'About',
    },
    {
      name: 'Contact',
    },
  ]
  function handleTiggleMenu() {
    setIsShowNavMenu(!isShowNavMenu)
  }
  function renderMenu() {
    return (
      <NavMenu>
        <MenuList>
          {MENU_DATA.map((item, index) => {
            return (
              <MenuItem isOpen={isShowNavMenu} currentIndex={index}>
                {item.name}
              </MenuItem>
            )
          })}
        </MenuList>
      </NavMenu>
    )
  }
  return (
    <Background>
      <RotatingNavigationPageContainer isOpen={isShowNavMenu}>
        <CircleContainer>
          <Circle onClick={handleTiggleMenu} isOpen={isShowNavMenu}>
            <OpenButton>+</OpenButton>
            <CloseButton>X</CloseButton>
          </Circle>
        </CircleContainer>
        <ContentWrapper>
          <StyledTitle>Article Title</StyledTitle>
          <SmallText>library.lai</SmallText>
          <Content>
            Pellentesque euismod sem faucibus velit mattis, vel dignissim ligula vehicula. Curabitur porta erat vitae mauris efficitur elementum. Fusce posuere nisi non aliquet varius. Nam tristique
            scelerisque sem non aliquet. In condimentum egestas orci eget interdum. Aenean aliquet lorem sed neque feugiat, nec tincidunt nibh pharetra. Maecenas pharetra ante non viverra luctus. Nunc
            massa eros, bibendum at magna sit amet, viverra molestie quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent ac libero consectetur, consectetur eros quis, rhoncus
            augue. Donec vitae urna efficitur, efficitur erat in, pellentesque turpis. Vivamus auctor, neque et hendrerit aliquet, quam elit ultricies mauris, quis laoreet justo dolor in dolor.{' '}
          </Content>
          <h3>Aaimal</h3>
          <Image src={'https://picsum.photos/id/1003/1200/1200'} />
          <Content>
            Morbi malesuada bibendum dolor, eget auctor metus. Morbi dapibus diam ex, vitae bibendum enim luctus sed. Nullam odio elit, lacinia in accumsan interdum, fermentum sed lectus. Praesent
            cursus, ligula sed semper facilisis, felis diam pellentesque turpis, a tincidunt tortor augue et nibh. Curabitur fermentum finibus luctus. Ut maximus iaculis lectus, a lacinia elit posuere
            et. Proin vel nulla ipsum. Sed blandit dictum nunc at dignissim. Nullam vel ligula posuere, interdum justo non, eleifend tortor. Duis ac risus eget purus maximus varius et eu felis.
            Praesent malesuada mauris id erat fermentum tincidunt. Phasellus eu dui ac nisl rutrum sodales. Nam sed nisl turpis. Ut vitae iaculis urna, at sagittis neque. Nullam condimentum elit et
            purus ullamcorper, ac volutpat velit faucibus.
          </Content>
        </ContentWrapper>
      </RotatingNavigationPageContainer>
      {renderMenu()}
    </Background>
  )
}
export default RotatingNavigationPage
