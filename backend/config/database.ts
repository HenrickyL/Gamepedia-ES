import mongoose from 'mongoose'


export default async ():Promise<void>  =>{

const {DB_URL_CONNECTION: uri} =process.env

    await mongoose.connect(uri || 'monodb://localhost:27017/gamepedia');

    mongoose.connection.on("connected",()=>{
        console.log("Mongoose! Conectado!");
    })
    mongoose.connection.on("disconnected",()=>{
        console.log("Mongoose! Desconectado!");
    })
    mongoose.connection.on("error",()=>{
        console.log("Mongoose! Erro na conexão!");
    })

    mongoose.set('debug',true);
}

//{useNewUrlParser:true,useUnifiedTopology:true}
