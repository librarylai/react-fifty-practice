import { AppDispatch } from '@/store/store'
import React from 'react'

export interface IServerSideProps {
	store: {
		dispatch: AppDispatch
	}
}

export interface IReactComponent extends React.FC {
	getServerSideProps?: (context: IServerSideProps) => {}
}

export interface IRouteItem {
	caseSensitive?: boolean
	children?: IRouteItem[]
	component?: IReactComponent
	element?: React.ReactNode
	index?: boolean
	path?: string
}