type HtmlParams = {
	body: string
	styles: string
	title: string
}
const Html = ({ body, styles, title }: HtmlParams): string => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      ${styles}
    </head>
    <body style="margin:0">
      <div id="app">${body}</div>
    </body>
  </html>
`

export default Html
