import express from 'express'
import {env} from "../config/env.service.js"
import { databaseConnection } from './database/connection.js'



export const bootStrap = async () => {
    const app = express()
    app.use(express.json())
    await databaseConnection()
    app.use('{*dummy}' ,(req,res)=> res.status(404).json('invalid route'))
    
    app.listen(env.port,()=>{
        console.log(`server is running on port ${env.port}`);
    })
}