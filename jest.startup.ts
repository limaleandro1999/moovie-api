import * as jestCli from 'jest-cli'
import * as app from './src/config/server'
import * as mongoose from 'mongoose'
import { environment } from './src/config/environment'
import { User } from './src/components/users/users.model'
import { Review } from './src/components/reviews/reviews.model'
import { initializeDb } from './src/config/db'

const beforeAllTests = async () => {
    environment.db.url = process.env.DB_URL || 'mongodb://localhost/moovie-api-test-db'
    environment.server.port = process.env.PORT || 3001

    initializeDb()
    .then(() => {
        app.listen(environment.server.port, () => {
            console.log(`Test server is running on port ${environment.server.port}`)
        })
    })
    .then(() => {
        User.remove({}).exec()
            .then(() => Review.remove({}).exec())
    }) 
}

const afterAllTest = () => {
    mongoose.disconnect().then(process.exit())
}

beforeAllTests()
.then(() => jestCli.run())
.then(() => afterAllTest())
.catch(console.error)