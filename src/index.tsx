import './index.css'

import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { loadableReady } from '@loadable/component'
import reportWebVitals from './reportWebVitals'
import { store } from '@/store/store'

// 一般 CRA 進入點
// ReactDOM.render(
// 	<React.StrictMode>
// 		<Provider store={store}>
// 			<BrowserRouter>
// 				<App />
// 			</BrowserRouter>
// 		</Provider>
// 	</React.StrictMode>,
// 	document.getElementById('root')
// )

// SSR 改用 ReactDOM.hydrate()
// ReactDOM.hydrate(
// 	<React.StrictMode>
//   <Provider store={store}>
// 		<BrowserRouter>
// 			<App />
// 		</BrowserRouter>
//	</Provider>
// 	</React.StrictMode>,
// 	document.getElementById('root')
// )

// 使用 loadableReady 包住 ReactDOM.hydrate()
loadableReady(() => {
	ReactDOM.hydrate(
		<React.StrictMode>
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		</React.StrictMode>,
		document.getElementById('root')
	)
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
