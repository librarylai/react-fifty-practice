import { AppDispatch } from '@/store/store'
import React from 'react'

export interface IServerSideProps {
  props?: {
    test: string
  }
}
export interface IServerSideContext {
  store: {
    dispatch: AppDispatch
  }
}

export interface IReactComponent<T> extends React.FC<T> {
  getServerSideProps?: (context: IServerSideContext) => Promise<{ props: { test: string } }>
}

export interface IRouteItem {
  caseSensitive?: boolean
  children?: IRouteItem[]
  component?: IReactComponent<{}>
  element?: React.ReactNode
  index?: boolean
  path?: string
}
