import express, { Request, Response } from 'express'
import path from 'path'
import cors from 'cors'
import _ from 'lodash'
import router from './routes/index'
const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
// Serve static files from the dist directory (your Vue build)
app.use(express.static(path.resolve(__dirname, '../dist')))
app.use('/', router)

app.listen(3000, async () => {
    console.log('Server is running on port 3000')
})
