import express, { Request, Response } from 'express'
import { fork } from 'child_process'
import path from 'path'
import cors from 'cors'
import _ from 'lodash'
import router from './routes/index'
const forked = fork('laravel.scheme.ts', [], { detached: true })
forked.on('message', (msg: any) => {
    console.log('msg', msg)
})
forked.send({ hello: 'Hello from parent process' })
const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
// Serve static files from the dist directory (your Vue build)
app.use(express.static(path.resolve(__dirname, '../dist')))
app.use('/', router)

app.listen(3000, async () => {
    console.log('Server is running on port 3000')
})
