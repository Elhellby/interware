import * as dotenv from 'dotenv'
dotenv.config()

const configuration = {
    getKey:(key: string) =>process.env[key] || ''
}

export default configuration