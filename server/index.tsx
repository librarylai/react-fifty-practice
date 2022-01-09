import App from '../src/App'
import { ChunkExtractor } from '@loadable/server'
import Html from './template/Html'
import { IRouteItem,IServerSideProps } from '@/interface/GeneralInterface'
import { Provider } from 'react-redux'
import React from 'react' // 引入 Root Component
import ReactDOMServer from 'react-dom/server' // 引入 ReactDOMServer 將 component 轉成 static HTML string
import { ServerStyleSheet } from 'styled-components' // <-- importing ServerStyleSheet
import { StaticRouter } from 'react-router-dom/server'
import express from 'express'
import fs from 'fs'
import { matchRoutes } from 'react-router-dom'
import path from 'path'
import routes from '@/route/routes'
import { store } from '@/store/store'

const port: string | number = process.env.PORT || 3001
const app = express()
app.use(express.static('build', { index: false })) // 指定靜態資源

const statsFile = path.resolve('build/loadable-stats.json')
// 實作處理 getServerSideProps
function getServerSidePropsPromise(req: express.Request) {
  // 比對 route ，抓出符合目前 request 的 route 項目
  let matchResult = matchRoutes(routes, req.path)
  // 如果沒有 match 到就直接 return
  if (!matchResult) return
  // 將 match 到的 route 裡面 component 的 getServerSideProps 執行
  let serverSidePropsPromise = matchResult.map(async (routeItem) => {
    let route: IRouteItem = routeItem.route 
    let component = route.component
    if (!component) return null
    // getServerSideProps is a promise function ( getServerSideProps 是一個 promise function )
    if (component.getServerSideProps) {
      return component.getServerSideProps({ store })
    }
    return null
  })
  // 這邊透過 filter 去濾掉 null 的項目
  return serverSidePropsPromise.filter((hasPromise) => hasPromise)
}
/* 使用 loadable/server ， server 端實做 code Splitting */
app.get('*', async (req, res) => {
  let serverSidePropsList: Array<IServerSideProps | null> = []
  let serverSidePropsPromise = getServerSidePropsPromise(req)
  // 因為 getServerSideProps 會回傳 promise  所以要再 await 一次拿到裡面得 props
  if (serverSidePropsPromise) {
    serverSidePropsList = await Promise.all(serverSidePropsPromise)
  }
  const webExtractor = new ChunkExtractor({ statsFile })
  const sheet = new ServerStyleSheet() // <-- 建立樣式表
  // 將 App 這個 component render 成 HTML string
  const staticHTML = ReactDOMServer.renderToString(
    webExtractor.collectChunks(
      sheet.collectStyles(
        <Provider store={store}>
          <StaticRouter location={req.url}>
            <App serverSideProps={serverSidePropsList} />
          </StaticRouter>
        </Provider>
      )
    )
  )

  const styles = sheet.getStyleTags() // <-- 從表中獲取所有標籤
  const preloadedState = store.getState()
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
          <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // https://redux.js.org/usage/server-rendering#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            '\\u003c'
          )}
          window.__SERVER_SIDE_PROPS__ = ${JSON.stringify(serverSidePropsList).replace(
            /</g,
            '\\u003c'
          )}
        </script>
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
