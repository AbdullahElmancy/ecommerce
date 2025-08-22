import dotenv from 'dotenv'
dotenv.config()

const ENV = {
    PORT_DEVELOPER: process.env.PORT_DEVELOPER || 3000,

}

export default ENV