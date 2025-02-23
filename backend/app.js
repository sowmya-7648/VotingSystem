require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/user.route')

const app = express()
const port = 8080

app.use(express.json())
mongoose.connect(process.env.mongo_uri).then(() => {
    console.log("Connected to DB")
}).catch(() => {
    console.log("Error")
})

app.use('/api/auth', userRoute)

app.listen(port, () => console.log(`server listening at port ${port}`))
