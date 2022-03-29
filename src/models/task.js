const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/mongoos-task-api',{
    useNewUrlParser: true 
    // useCreateIndex: true
})

const TaskSchema = new mongoose.Schema({
    title :{
        type: String,
        required: true 
    },
    describtion :{
        type: String
        , required: true
    },
    complete:{
        type: Boolean,
        
  
    }

  
  
},{
    timestamps: true
})


const Task = mongoose.model('Task',TaskSchema)


module.exports = Task