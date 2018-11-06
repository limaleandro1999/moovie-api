import * as express from 'express'
import * as bodyParser from 'body-parser'
import { router } from './router'

import { initializeDb } from './db'

const app: express.Application = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

initializeDb();
router(app)

export = app