`use strict`

import mongoose from "mongoose"

export const dbConnection = async () =>{
    try{
        mongoose.connection.on("error", () =>{
            console.log("Mongo | connection falied to MongoDB Service")
        })

        mongoose.connection.on("connecting", () =>{
            console.log("Mongo | connecting to MongoDB Service")
        })
        
        mongoose.connection.on("connected", () =>{
            console.log("Mongo | connected to MongoDB Service")
        })

        mongoose.connection.on("open", () =>{
            console.log("Mongo | open to Database")
        })

        mongoose.connection.on("reconnected", () =>{
            console.log("Mongo | connected to MongoDB Service")
        })

        mongoose.connection.on("disconnected", () =>{
            console.log("Mongo | disconnected to MongoDB Service")
        })

        await mongoose.connect(process.env.URI_MONGO,{
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50,
        })
    }catch(err){
        console.log(`Database connection falied: ${err}`)
    }
}