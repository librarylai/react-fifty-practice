import { Link, Route, Routes } from 'react-router-dom'

import React from 'react'
import loadable from '@loadable/component'
import StickyNaigation from '@/components/stickyNaigation/StickyNavigation'
/* 最原始版本 一般引入 */
// import BlurryLoadingPage from '@/containers/blurryLoading/BlurryLoadingPage'
// import ExpandingCardsPage from '@/containers/expandingCards/ExpandingCardsPage'
// import ScrollAnimationPage from '@/containers/scrollAnimation/ScrollAnimationPage'
// import RotatingNavigationPage from '@/containers/rotatingNavigation/RotatingNavigationPage'
// import HiddenSearchWidgetPage from '@/containers/hiddenSearchWidget/HiddenSearchWidgetPage'

/* 使用 React.lazy  */
// const BlurryLoadingPage = React.lazy(() => import(/*webpackChunkName:'BlurryLoadingPage'*/ '@/containers/blurryLoading/BlurryLoadingPage'))
// const ExpandingCardsPage = React.lazy(() => import(/*webpackChunkName:'ExpandingCardsPage'*/ '@/containers/expandingCards/ExpandingCardsPage'))
// const ScrollAnimationPage = React.lazy(() => import(/*webpackChunkName:'ScrollAnimationPage'*/ '@/containers/scrollAnimation/ScrollAnimationPage'))
// const RotatingNavigationPage = React.lazy(() => import(/*webpackChunkName:'RotatingNavigationPage'*/ '@/containers/rotatingNavigation/RotatingNavigationPage'))
// const HiddenSearchWidgetPage = React.lazy(() => import(/*webpackChunkName:'HiddenSearchWidgetPage'*/ '@/containers/hiddenSearchWidget/HiddenSearchWidgetPage'))

/* 使用 loadable component */
const BlurryLoadingPage = loadable(
	() => import(/*webpackChunkName:'BlurryLoadingPage'*/ '@/containers/blurryLoading/BlurryLoadingPage')
)
const ExpandingCardsPage = loadable(
	() => import(/*webpackChunkName:'ExpandingCardsPage'*/ '@/containers/expandingCards/ExpandingCardsPage')
)
const ScrollAnimationPage = loadable(
	() => import(/*webpackChunkName:'ScrollAnimationPage'*/ '@/containers/scrollAnimation/ScrollAnimationPage')
)
const RotatingNavigationPage = loadable(
	() => import(/*webpackChunkName:'RotatingNavigationPage'*/ '@/containers/rotatingNavigation/RotatingNavigationPage')
)
const HiddenSearchWidgetPage = loadable(
	() => import(/*webpackChunkName:'HiddenSearchWidgetPage'*/ '@/containers/hiddenSearchWidget/HiddenSearchWidgetPage')
)

function LoadingComponent() {
	return <div>Loading</div>
}

function App() {
	return (
		<div>
			<StickyNaigation/>
			<Routes>
				<Route path="/" element={<ExpandingCardsPage fallback={<LoadingComponent />} />} />
				<Route path="/ExpandingCards" element={<ExpandingCardsPage fallback={<LoadingComponent />} />} />
				<Route path="/ScrollAnimation" element={<ScrollAnimationPage fallback={<LoadingComponent />} />} />
				<Route
					path="/RotatingNavigation"
					element={<RotatingNavigationPage fallback={<LoadingComponent />} />}
				/>
				<Route path="/BlurryLoading" element={<BlurryLoadingPage fallback={<LoadingComponent />} />} />
				<Route
					path="/HiddenSearchWidget"
					element={<HiddenSearchWidgetPage fallback={<LoadingComponent />} />}
				/>
			</Routes>
		</div>
	)
}

export default App
