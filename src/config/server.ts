import * as express from 'express'
import * as bodyParser from 'body-parser'
import { router } from './router'
import { tokenParser } from '../components/security/token.parser'

import { initializeDb } from './db'

const app: express.Application = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(tokenParser)

initializeDb();
router(app)

export = app