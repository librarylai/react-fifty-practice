import { Link, Route, Routes } from 'react-router-dom'

import React from 'react'
import StickyNavigation from '@/components/stickyNaigation/StickyNavigation'
import loadable from '@loadable/component'
import { matchRoutes } from 'react-router-dom'
import routes from '@/route/routes'
import styled from 'styled-components'

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
const StepsPage = loadable(() => import(/*webpackChunkName:'StepPage'*/ '@/containers/steps/StepsPage'))

function LoadingComponent() {
	return <div>Loading</div>
}
interface IApp extends React.FC {
	serverSideProps?: []
}
function App({ serverSideProps }: IApp) {
	console.log('matchRoutes', matchRoutes(routes, '/ScrollAnimation'))
	return (
		<div>
			<StickyNavigation />
			<Container>
				<Routes>
					<Route path="/" element={<ExpandingCardsPage fallback={<LoadingComponent />} />} />
					<Route path="/ExpandingCards" element={<ExpandingCardsPage fallback={<LoadingComponent />} />} />
					<Route
						path="/ScrollAnimation"
						element={
							<ScrollAnimationPage serverSideProps={serverSideProps} fallback={<LoadingComponent />} />
						}
					/>
					<Route
						path="/RotatingNavigation"
						element={<RotatingNavigationPage fallback={<LoadingComponent />} />}
					/>
					<Route path="/BlurryLoading" element={<BlurryLoadingPage fallback={<LoadingComponent />} />} />
					<Route
						path="/HiddenSearchWidget"
						element={<HiddenSearchWidgetPage fallback={<LoadingComponent />} />}
					/>
					<Route path="/StepsPage" element={<StepsPage fallback={<LoadingComponent />} />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App
