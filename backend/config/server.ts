import express,{Response,Request} from 'express'
import {Server,Socket} from 'socket.io'
import {createServer} from 'http'
import path from 'path'
import cors from 'cors'
//routes
import allRoutes from '../app/routers'




export default ()=>{
    const app = express()
    const http = createServer(app)
    
    const io = new Server(http)
    
    const port = process.env.PORT || 80
    {//settings
        app.set("port",port)
        app.use(express.json())

        app.use(express.urlencoded({ extended : true }))
        app.use(express.static(path.join(__dirname, "..",'public')))
        app.use(cors())
    }

    app.get('/',(_,res:Response)=>{
        return res.status(200).json({status: "active",message: "Welcome"});
    })
    
    allRoutes.forEach(route=>{
        app.use(route)
    })
    
    app.all('/*',(_,res:Response)=>{
        return res.status(404).json({message: "Não encontrado"});
    })
    
    
    
    {//socket.io
        io.on('connection',(socket : Socket)=>{
            console.log(`[IO] ${socket.id} se conectou!`)
        })
    }
    
    
    
    http.listen(port,()=>{
    
        console.log(`Server is running on port ${port}`)
    })
    
    return  {http, io}
}