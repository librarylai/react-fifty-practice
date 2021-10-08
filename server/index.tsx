import App from '../src/App'
import Html from './template/Html'
import React from 'react' // 引入 Root Component
import ReactDOMServer from 'react-dom/server' // 引入 ReactDOMServer 將 component 轉成 static HTML string
import { ServerStyleSheet } from 'styled-components' // <-- importing ServerStyleSheet
import express from 'express'

const port: string | number = process.env.PORT || 3001
const app = express()
app.get('/', (req, res) => {
	const sheet = new ServerStyleSheet() // <-- 建立樣式表
	const staticHTML = ReactDOMServer.renderToString(sheet.collectStyles(<App />))
	const styles = sheet.getStyleTags() // <-- 從表中獲取所有標籤
	// 將 App 這個 component render 成 HTML string
	res.send(Html({ body: staticHTML, styles: styles, title: 'SSR' }))
})

app.listen(port, () => console.log('Example app is listening on port 3001.'))
