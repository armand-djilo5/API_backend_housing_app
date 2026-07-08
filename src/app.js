import express from 'express'
import rateLimit from 'express-rate-limit'
import auth_router from './routes/User.routes.js'


const app = express()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000 , // 15mintes
    max: 100,  // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later "
})

app.use(express.json())
app.use(limiter)
app.use('/api/auth', auth_router)




export default app