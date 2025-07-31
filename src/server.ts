import mongoose from "mongoose"
import { envVars } from "./app/config/env"
import { Server } from "http"
import { app } from "./app"
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin"

let server: Server

const startServer = async() => {
  try{
    await mongoose.connect(envVars.DB_URL)
    console.log('Connected to DB')

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listening to port 3000`)
    })
  }catch(err){
    console.log(err)
  }
}

(async () => {
  await startServer()
  seedSuperAdmin()
})()
