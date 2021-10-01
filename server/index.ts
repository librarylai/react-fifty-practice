import App from '../src/App'
import express from 'express'

/* React 相關 */

const port: string | number = process.env.PORT || 3001
console.log('process.env.PORT', process.env.PORT)
const app = express()
app.get('/', (req, res) => {
	res.send('Successful response.')
})

app.listen(port, () => console.log('Example app is listening on port 3001.'))
