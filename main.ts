import * as app from './src/config/server'
import { environment } from './src/config/environment'
import { initializeDb } from './src/config/db'

initializeDb()
    .then(() => {
        app.listen(environment.server.port, () => {
            console.log(`Server is running on port ${environment.server.port}`)
        })
    })
