import BlurryLoadingPage from '@/containers/blurryLoading/BlurryLoadingPage'
import ExpandingCardsPage from '@/containers/expandingCards/ExpandingCardsPage'
import HiddenSearchWidgetPage from '@/containers/hiddenSearchWidget/HiddenSearchWidgetPage'
import { IRouteItem } from '@/interface/GeneralInterface'
import React from 'react'
import RotatingNavigationPage from '@/containers/rotatingNavigation/RotatingNavigationPage'
import ScrollAnimationPage from '@/containers/scrollAnimation/ScrollAnimationPage'
import StepsPage from '@/containers/steps/StepsPage'
import loadable from '@loadable/component'

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

// 這邊多了一個  component 的參數，主要是給 Server Side 能夠呼叫 component 的 getServerSideProps
const serverSideRoutes: IRouteItem[] = [
	{ path: '/', component: ExpandingCardsPage, element: <ExpandingCardsPageLoadable /> },
	{ path: '/ExpandingCards', component: ExpandingCardsPage, element: <ExpandingCardsPageLoadable /> },
	{ path: '/ScrollAnimation', component: ScrollAnimationPage, element: <ScrollAnimationPageLoadable /> },
	{ path: '/RotatingNavigation', component: RotatingNavigationPage, element: <RotatingNavigationPageLoadable /> },
	{ path: '/BlurryLoading', component: BlurryLoadingPage, element: <BlurryLoadingPageLoadable /> },
	{ path: '/HiddenSearchWidget', component: HiddenSearchWidgetPage, element: <HiddenSearchWidgetPageLoadable /> },
	{ path: '/StepsPage', component: StepsPage, element: <StepsPageLoadable /> },
]

export default serverSideRoutes
