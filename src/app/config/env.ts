import dotenv from 'dotenv'
dotenv.config()

interface EnvConfig {
    DB_URL: string
}
const loadEnvVariable = ():EnvConfig => {
    const requiredEnvVariable = ['DB_URL']

    requiredEnvVariable.forEach(key => {
        if(!process.env[key]){
            throw new Error(`${key}, env variable is missing!`)
        }
    })

    return {
        DB_URL: process.env.DB_URL as string
    }
}

export const envVars: EnvConfig = loadEnvVariable()