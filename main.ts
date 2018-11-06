import * as app from './src/config/server'
import { environment } from './src/config/environment'

app.listen(environment.server.port, () => {
    console.log(`Server is running on port ${environment.server.port}`)
});