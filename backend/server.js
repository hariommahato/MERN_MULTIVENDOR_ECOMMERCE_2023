const app =require('./app')
const dotenv=require("dotenv")
const connectDatabase=require('./config/database')
const cloudinary=require('cloudinary')

//handling uncaught Exception
process.on("uncaughtException",(error)=>{
    console.log(`Error :${error.message}`)
    console.log(`Shutting Down The Server Due to Uncaught Exception`)
    process.exit(1)

})
//config
dotenv.config({path:"backend/config/config.env"})

// connecting database
connectDatabase()
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})
const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})


// unhandled promise rejection
process.on("unhandledRejection",error=>{
    console.log(`Error:${error.message}`)
    console.log(`Shutting Down The Server Due to Unhandled Promise Rejection`)
    server.close(()=>{
        process.exit(1)
    })
})