const mongoose = require('mongoose')
const validator = require('validator')
const bycrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchma = new mongoose.Schema({
  UserName :{
      type: String,
      required: true

  },
  UserEmail :{
      type: String,
      unique:true,
      required: true,
      validate(value){
          if(!validator.isEmail(value)){
            throw new Error ('Your email is not valid ')
          }
      }
  },
  Password:{
      type: String,
      required: true 

  },
  Complete: {
   type: Boolean   
  },
  tokens:[{
      token:{
          type: String ,
          required: true
      }
  }],
  avatar: {
      type: Buffer
  }
 


},{
    timestamps: true
})

mongoose.connect('mongodb://127.0.0.1:27017/mongoos-task-api',{
    useNewUrlParser: true 
    // useCreateIndex: true
})

UserSchma.pre('save', async function (next) {
     const user = this
     if(user.isModified('Password')){
         user.Password = await bycrypt.hash(user.Password, 8)
     }
    next()
})

UserSchma.methods.GenAuthToken = async function () {
    const user = this 
    const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}


UserSchma.statics.findByCredentials = async (UserEmail,Password)=>{
 const user = await User.findOne({UserEmail})
    if(!user){
        throw new Error ('No account found !!')
    }
    const isMatch = await bycrypt.compare(Password, user.Password)
    if (!isMatch){
        throw new Error ('unable to login')
    }
    return user
}



const User = mongoose.model('User',UserSchma)




module.exports = User