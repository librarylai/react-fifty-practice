import React, { Suspense } from 'react'
/* 最原始版本 一般引入 */
// import BlurryLoadingPage from '@/containers/blurryLoading/BlurryLoadingPage'
// import ExpandingCardsPage from '@/containers/expandingCards/ExpandingCardsPage'
// import ScrollAnimationPage from '@/containers/scrollAnimation/ScrollAnimationPage'
// import RotatingNavigationPage from '@/containers/rotatingNavigation/RotatingNavigationPage'
// import HiddenSearchWidgetPage from '@/containers/hiddenSearchWidget/HiddenSearchWidgetPage'
// import StepsPage from '@/containers/steps/StepsPage'
import {
  Routes, // 這邊需注意 官方文件寫的 Switch 已經在最新版本被改用為 Routes
  Route,
  Link,
} from 'react-router-dom'
/* 使用 React.lazy  */
const BlurryLoadingPage = React.lazy(() => import(/*webpackChunkName:'BlurryLoadingPage'*/ '@/containers/blurryLoading/BlurryLoadingPage'))
const ExpandingCardsPage = React.lazy(() => import(/*webpackChunkName:'ExpandingCardsPage'*/ '@/containers/expandingCards/ExpandingCardsPage'))
const ScrollAnimationPage = React.lazy(() => import(/*webpackChunkName:'ScrollAnimationPage'*/ '@/containers/scrollAnimation/ScrollAnimationPage'))
const RotatingNavigationPage = React.lazy(() => import(/*webpackChunkName:'RotatingNavigationPage'*/ '@/containers/rotatingNavigation/RotatingNavigationPage'))
const HiddenSearchWidgetPage = React.lazy(() => import(/*webpackChunkName:'HiddenSearchWidgetPage'*/ '@/containers/hiddenSearchWidget/HiddenSearchWidgetPage'))
// const StepsPage = React.lazy(() => import('/*webpackChunkName:'StepsPage'*/@/containers/steps/StepsPage'));

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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<ExpandingCardsPage />} />
          <Route path='/ExpandingCards' element={<ExpandingCardsPage />} />
          <Route path='/ScrollAnimation' element={<ScrollAnimationPage />} />
          <Route path='/RotatingNavigation' element={<RotatingNavigationPage />} />
          <Route path='/BlurryLoading' element={<BlurryLoadingPage />} />
          <Route path='/HiddenSearchWidget' element={<HiddenSearchWidgetPage />} />
          {/* <Route path='/StepsPage' element={<StepsPage />} /> */}
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
