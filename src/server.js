import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import webPush from 'web-push'
import path from 'path'

import { environment } from './environments'
import api from './api'

class Server {
  constructor() {
    this.express = express()
    this.webPush = webPush
    this.middleware()
    this.routes()
  }

  middleware() {
    this.express.use(express.static(path.join(__dirname, 'client')))
    this.express.use(express.json())
    this.express.use(bodyParser.urlencoded({ extended: true }))
    this.express.use(bodyParser.json({ limit: '2mb' }))
    this.express.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header(
        'Access-Control-Allow-Headers',
        'X-Requested-With, Content-Type, Authorization',
      )
      res.header(
        'Access-Control-Allow-Methods',
        'GET,PUT,PATCH,POST,DELETE,OPTIONS',
      )
      next()
    })
    this.express.use(cors())

    webPush.setVapidDetails(
      'mailto:test@test.com',
      environment.publicKey,
      environment.privateKey,
    )
  }

  routes() {
    this.express.get('/health', (req, res) => {
      res.status(200).json({ server: 'server is working!' })
    })
    this.express.use('/api', api)
  }
}

export default new Server().express
