import BlurryLoadingPage from './containers/blurryLoading/BlurryLoadingPage'
import ExpandingCardsPage from './containers/expandingCards/ExpandingCardsPage'
import React from 'react'
import ScrollAnimationPage from './containers/scrollAnimation/ScrollAnimationPage'
import RotatingNavigationPage from './containers/rotatingNavigation/RotatingNavigationPage'
import HiddenSearchWidgetPage from './containers/hiddenSearchWidget/HiddenSearchWidgetPage'
// import StepsPage from './containers/steps/StepsPage'
import {
  Routes, // 這邊需注意 官方文件寫的 Switch 已經在最新版本被改用為 Routes
  Route,
  Link,
} from 'react-router-dom'

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/ExpandingCards'>ExpandingCards</Link>
          </li>
          <li>
            <Link to='/ScrollAnimation'>ScrollAnimation</Link>
          </li>
          <li>
            <Link to='/RotatingNavigation'>RotatingNavigation</Link>
          </li>
          <li>
            <Link to='/BlurryLoading'>BlurryLoading</Link>
          </li>
          <li>
            <Link to='/HiddenSearchWidget'>HiddenSearchWidget</Link>
          </li>
          <li>
            <Link to='/StepsPage'>StepsPage</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<ExpandingCardsPage />} />
        <Route path='/ExpandingCards' element={<ExpandingCardsPage />} />
        <Route path='/ScrollAnimation' element={<ScrollAnimationPage />} />
        <Route path='/RotatingNavigation' element={<RotatingNavigationPage />} />
        <Route path='/BlurryLoading' element={<BlurryLoadingPage />} />
        <Route path='/HiddenSearchWidget' element={<HiddenSearchWidgetPage />} />
        {/* <Route path='/StepsPage' element={<StepsPage />} /> */}
      </Routes>
    </div>
  )
}

export default App
