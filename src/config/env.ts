import dotenv from 'dotenv'
dotenv.config()

const ENV = {
    PORT_DEVELOPER: process.env.PORT_DEVELOPER || 3000,
    MONGOKEY : process.env.MONGOKEY || "mongodb://localhost:27017/ecommerce",
    SALT_ROUNDS : process.env.SALT_ROUNDS || 10,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
    JWT_SECRET : process.env.JWT_SECRET,
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET : process.env.CLOUDINARY_API_SECRET,
  GOOGLE_CLIENT_AUTH: process.env.GOOGLE_CLIENT_AUTH,
  GOOGLE_CLIENT_AUTH_SECRET: process.env.GOOGLE_CLIENT_AUTH_SECRET,
  FB_CLIENT_ID: process.env.FB_CLIENT_ID,
  FB_CLIENT_SECRET: process.env.FB_CLIENT_SECRET
}

export default ENV