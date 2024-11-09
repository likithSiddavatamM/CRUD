import express, { NextFunction } from 'express'
import db from '../Config/db.Config'
import { router } from '../Routes/post.routes'
import dotenv from 'dotenv'
dotenv.config();

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//routes
app.use('/api/v1/posts', router)

//db connection then server connection
db.then(()=>{
    console.log("DataBase connected successfully")
    app.listen(7070, () => console.log('Server is listening on port 7070'))})
    .catch(()=>{
    console.log("couldn't connect")
    })


    