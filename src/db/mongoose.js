const mongoose = require('mongoose')


mongoose.createConnection(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
    
    
})






























// const User = mongoose.model('User',{

// name: {
// type : String,
// trim: true 

// },

// age: {
// type: Number,
// required: true ,
// validate(value){
//     if(value <0 ){
//         throw new Error ('Age must be a positive number')
//     }
// }
// },

// email : {
//     type: String,
//     required: true ,
//     validate(value){
//         if(!validator.isEmail(value)){
//             throw new Error ('Email is invalid1!')
//         }
//     }

// },
// password: {
//     type: String,
//     required: true ,
//     trim: true ,
//     minlength : 6,
//     validate(value){
//         if (value.includes('password')){
//             throw new Error('Password cannot conatain "password"')
//         }
//     }
// }

// })

// const me = new User({
// name: 'blam    ',
// age: 55,
// email : 'bombom@gmail.com',
// password: 'password'

// })

// me.save().then((result)=>{
//     console.log(result);
// }).catch((error)=>{

//     console.log(error);
// })

// const Order = mongoose.model('Order',{
//     Product_name: {
//         type: String
//     },
   
//    quantity: {
//        type: Number
//    },
//    ordered_by: {
//        type: String
//    },
//    is_complete_order: {
//        type : Boolean
//    }

// })

// const customar = new Order({
//     Product_name: 'IPhone 15 pro max ultra Legendary',
//     quantity : 5,
//     ordered_by: 'Bayezid Boss',
//     is_complete_order: true
// })  
// customar.save().then((result)=>{
//     console.log(result);
// }).catch((error)=>{
//     console.log(error);
// })
