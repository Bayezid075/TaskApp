const express = require('express')
const User = require('./models/users')
const Task = require('./models/task')
const { find } = require('./models/users')
const app = express()
const port = process.env.PORT
require('./db/mongoose')
const userRoute = require('./router/user')
const taskRoute = require('./router/task')
const multer = require('multer')
const auth = require('./middleware/auth')
app.use(express.json())
app.use(userRoute)
app.use(taskRoute)
app.listen(port,()=>{
console.log('Start server by '+ port);
})
