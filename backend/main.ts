import createServer from './config/server'
import database from './config/database'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand';


dotenvExpand(dotenv.config())


database().then(_=>{
    createServer();
}).catch(e=>{
    console.error(e);
})




