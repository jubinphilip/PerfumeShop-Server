import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/routes.js'
import { seedData } from './utils/seedFunction.js'
dotenv.config

const app=express()
app.use(cors())
//seedData()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/user',router)
app.use('/Images', express.static('Images'));
app.listen(process.env.PORT,()=>{
    console.log("Server is running")
})