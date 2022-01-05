import App from '../src/App'
import { ChunkExtractor } from '@loadable/server'
import Html from './template/Html'
import { Provider } from 'react-redux'
import React from 'react' // 引入 Root Component
import ReactDOMServer from 'react-dom/server' // 引入 ReactDOMServer 將 component 轉成 static HTML string
import { ServerStyleSheet } from 'styled-components' // <-- importing ServerStyleSheet
import { StaticRouter } from 'react-router-dom/server'
import express from 'express'
import fs from 'fs'
import path from 'path'
import { store } from '@/store/store'

const port: string | number = process.env.PORT || 3001
const app = express()
app.use(express.static('build', { index: false })) // 指定靜態資源

const statsFile = path.resolve('build/loadable-stats.json')

/* 使用 loadable/server ， server 端實做 code Splitting */
app.get('*', (req, res) => {
	const webExtractor = new ChunkExtractor({ statsFile })
	const sheet = new ServerStyleSheet() // <-- 建立樣式表
	// 將 App 這個 component render 成 HTML string
	const staticHTML = ReactDOMServer.renderToString(
		webExtractor.collectChunks(
			sheet.collectStyles(
				<Provider store={store}>
					<StaticRouter location={req.url}>
						<App />
					</StaticRouter>
				</Provider>
			)
		)
	)

	const styles = sheet.getStyleTags() // <-- 從表中獲取所有標籤

	res.set('content-type', 'text/html')
	res.send(`
	    <!DOCTYPE html>
	    <html>
	      <head>
				${styles}
	      ${webExtractor.getLinkTags()}
	      ${webExtractor.getStyleTags()}
	      </head>
	      <body>
	        <div id="root">${staticHTML}</div>
	        ${webExtractor.getScriptTags()}
	      </body>
	    </html>
	  `)
})

/* 只有前端使用 loadable/component 實作 code-splitting */
// app.get('*', (req, res) => {
// 	const sheet = new ServerStyleSheet() // <-- 建立樣式表
// 	// 將 App 這個 component render 成 HTML string
// 	const staticHTML = ReactDOMServer.renderToString(
// 		sheet.collectStyles(
// 			<StaticRouter location={req.url}>
// 				<App />
// 			</StaticRouter>
// 		)
// 	)
// 	const styles = sheet.getStyleTags() // <-- 從表中獲取所有標籤
// 	fs.readFile('build/app.html', 'utf8', (err, data) => {
// 		if (err) {
// 			console.log('err:', err)
// 			return
// 		}
// 		// 讀取完檔案後，將原本的 root  替換掉 靜態Html
// 		return res.send(
// 			data.replace(
// 				`<div id="root"></div>`,
// 				`<div id="root">${Html({ body: staticHTML, styles: styles, title: 'SSR' })}</div>`
// 			)
// 		)
// 	})
// })

app.listen(port, () => console.log('Example app is listening on port 3001.'))
