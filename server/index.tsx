import App from '../src/App'
import Html from './template/Html'
import React from 'react' // 引入 Root Component
import ReactDOMServer from 'react-dom/server' // 引入 ReactDOMServer 將 component 轉成 static HTML string
import { ServerStyleSheet } from 'styled-components' // <-- importing ServerStyleSheet
import express from 'express'
import fs from 'fs'

const port: string | number = process.env.PORT || 3001
const app = express()
app.get('/', (req, res) => {
	const sheet = new ServerStyleSheet() // <-- 建立樣式表
	// 將 App 這個 component render 成 HTML string
	const staticHTML = ReactDOMServer.renderToString(sheet.collectStyles(<App />))
	const styles = sheet.getStyleTags() // <-- 從表中獲取所有標籤
	fs.readFile('build/index.html', 'utf8', (err, data) => {
		if (err) {
			console.log('err:', err)
			return
		}
		// 讀取完檔案後，將原本的 root  替換掉 靜態Html
		return res.send(
			data.replace(
				`<div id="root"></div>`,
				`<div id="root">${Html({ body: staticHTML, styles: styles, title: 'SSR' })}</div>`
			)
		)
	})
})
app.use(express.static('build')) // 指定靜態資源

app.listen(port, () => console.log('Example app is listening on port 3001.'))
