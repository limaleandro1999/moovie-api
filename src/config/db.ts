import * as mongoose from 'mongoose'
import { environment } from './environment'


export const initializeDb = () => {
    (<any>mongoose).Promise = global.Promise
    
    mongoose.set('useCreateIndex', true);
    return mongoose.connect(environment.db.url, {useNewUrlParser: true})
}