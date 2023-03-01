import { Route, Routes } from 'react-router-dom'

import React, { Suspense } from 'react'
import StickyNavigation from '@/components/stickyNaigation/StickyNavigation'
import loadable from '@loadable/component'
import styled from 'styled-components'
import { IServerSideProps } from '@/interface/GeneralInterface'

const Container = styled.div`
  position: relative;
  top: 110px;
`

/* 最原始版本 一般引入 */
// import BlurryLoadingPage from '@/containers/blurryLoading/BlurryLoadingPage'
// import ExpandingCardsPage from '@/containers/expandingCards/ExpandingCardsPage'
// import ScrollAnimationPage from '@/containers/scrollAnimation/ScrollAnimationPage'
// import RotatingNavigationPage from '@/containers/rotatingNavigation/RotatingNavigationPage'
// import HiddenSearchWidgetPage from '@/containers/hiddenSearchWidget/HiddenSearchWidgetPage'

/* 使用 React.lazy  */
const BlurryLoadingPage = React.lazy(() => import(/*webpackChunkName:'BlurryLoadingPage'*/ '@/containers/blurryLoading/BlurryLoadingPage'))
const ExpandingCardsPage = React.lazy(
  () => import(/*webpackChunkName:'ExpandingCardsPage'*/ '@/containers/expandingCards/ExpandingCardsPage')
)
const ScrollAnimationPage = React.lazy(
  () => import(/*webpackChunkName:'ScrollAnimationPage'*/ '@/containers/scrollAnimation/ScrollAnimationPage')
)
const RotatingNavigationPage = React.lazy(
  () => import(/*webpackChunkName:'RotatingNavigationPage'*/ '@/containers/rotatingNavigation/RotatingNavigationPage')
)
const HiddenSearchWidgetPage = React.lazy(
  () => import(/*webpackChunkName:'HiddenSearchWidgetPage'*/ '@/containers/hiddenSearchWidget/HiddenSearchWidgetPage')
)
const StepsPage = loadable(() => import(/*webpackChunkName:'StepPage'*/ '@/containers/steps/StepsPage'))

/* 使用 loadable component */
const BlurryLoadingPageLoadable = loadable(
  () => import(/*webpackChunkName:'BlurryLoadingPage'*/ '@/containers/blurryLoading/BlurryLoadingPage')
)
const ExpandingCardsPageLoadable = loadable(
  () => import(/*webpackChunkName:'ExpandingCardsPage'*/ '@/containers/expandingCards/ExpandingCardsPage')
)
const ScrollAnimationPageLoadable = loadable(
  () => import(/*webpackChunkName:'ScrollAnimationPage'*/ '@/containers/scrollAnimation/ScrollAnimationPage')
)
const RotatingNavigationPageLoadable = loadable(
  () => import(/*webpackChunkName:'RotatingNavigationPage'*/ '@/containers/rotatingNavigation/RotatingNavigationPage')
)
const HiddenSearchWidgetPageLoadable = loadable(
  () => import(/*webpackChunkName:'HiddenSearchWidgetPage'*/ '@/containers/hiddenSearchWidget/HiddenSearchWidgetPage')
)
const StepsPageLoadable = loadable(() => import(/*webpackChunkName:'StepPage'*/ '@/containers/steps/StepsPage'))

function LoadingComponent() {
  return <div>Loading</div>
}
interface IApp {
  serverSideProps?: Array<IServerSideProps | null>
}
const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  > button {
    margin-right: 20px;
  }
`
const App: React.FC<IApp> = ({ serverSideProps }) => {
  const dynamicImportLodash = () => {
    import(/*webpackChunkName:'LodashChunk'*/ 'lodash').then((lodash) => {
      console.log(lodash)
      /* 拿到 lodash 瞜！ 開始做某些操作.......... */
    })
  }

  const renderLoadableRouteComponents = () => {
    return (
      <Routes>
        <Route path='/' element={<ExpandingCardsPageLoadable fallback={<LoadingComponent />} />} />
        <Route path='/ExpandingCards' element={<ExpandingCardsPageLoadable fallback={<LoadingComponent />} />} />
        <Route
          path='/ScrollAnimation'
          element={<ScrollAnimationPageLoadable serverSideProps={serverSideProps} fallback={<LoadingComponent />} />}
        />
        <Route path='/RotatingNavigation' element={<RotatingNavigationPageLoadable fallback={<LoadingComponent />} />} />
        <Route path='/BlurryLoading' element={<BlurryLoadingPageLoadable fallback={<LoadingComponent />} />} />
        <Route path='/HiddenSearchWidget' element={<HiddenSearchWidgetPageLoadable fallback={<LoadingComponent />} />} />
        <Route path='/StepsPage' element={<StepsPageLoadable fallback={<LoadingComponent />} />} />
      </Routes>
    )
  }

  const renderReactLazyRouteComponents = () => {
    return (
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path='/' element={<ExpandingCardsPage />} />
          <Route path='/ExpandingCards' element={<ExpandingCardsPage />} />
          <Route path='/ScrollAnimation' element={<ScrollAnimationPage serverSideProps={serverSideProps} />} />
          <Route path='/RotatingNavigation' element={<RotatingNavigationPage />} />
          <Route path='/BlurryLoading' element={<BlurryLoadingPage />} />
          <Route path='/HiddenSearchWidget' element={<HiddenSearchWidgetPage />} />
          <Route path='/StepsPage' element={<StepsPage />} />
        </Routes>
      </Suspense>
    )
  }

  return (
    <div>
      <StickyNavigation />
      <Container>
        <ButtonWrapper>
          <button style={{ backgroundColor: 'lightblue' }} onClick={dynamicImportLodash}>
            動態載入lodash 1
          </button>
          <button style={{ backgroundColor: 'orange' }} onClick={dynamicImportLodash}>
            動態載入lodash 2
          </button>
        </ButtonWrapper>
        {/*  use loadable component for ssr */}
        {/* {renderLoadableRouteComponents()}  */}

        {/* use React.lazy for demo Code splitting */}
        {renderReactLazyRouteComponents()}
      </Container>
    </div>
  )
}

export default App
