const express = require('express')
const User = require('../models/users')
const router = new express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const {wellComeEmail,AfterDelEmail} = require('../emails/accounts')
router.get('/user/me',auth, async(req,res)=>{
res.send(req.user)

})

router.post('/user',async(req,res)=>{
    const UserList = new User(req.body)
    try {
        await UserList.save()

        wellComeEmail(UserList.UserEmail,UserList.UserName)

        const token = await UserList.GenAuthToken()
        res.status(201).send({UserList,token})
    } catch (error) {
        res.status(500).send(error)
    }
    })
    
    
    router.get('/user/:id',async(req,res)=>{
        const _id = req.params.id
        try {
           const UserMan =  await User.findById(_id)
            if(!User){
              return  res.status(404).send()
            }
            res.send(UserMan)
        } catch (error) {
            res.status(500).send(error)
        }
    
        // User.findById(_id).then((user)=>{
        //     if(!user){
        //         return res.status(404).send()
        //     }
        //     res.send(user)
        // }).catch((e)=>{
        //     res.status(500).send()
        
        // })
    })
    router.patch('/user/:id',async(req,res)=>{
        const updates = Object.keys(req.body)
        const allowUpdate = ['UserName','UserEmail','Password']
        const isValidOperation = updates.every((bingo)=> allowUpdate.includes(bingo))
        if (!isValidOperation) {
            return res.status(400).send({error: 'invalid operation'})
        }
    
    try {
        const user = await User.findByIdAndUpdate(req.params.id)
        updates.forEach((update)=> user[update] = req.body[update]  )
        await user.save()


     //  const UserUpdate = await User.findByIdAndUpdate(req.params.id, req.body ,{new:true , runValidators:true})
        if(!User){
          return  res.status(404).send()
        }
        res.send(UserUpdate)
    } catch (error) {
        res.status(400).send()
    }
    })
    
    
    router.delete('/user/:id',async(req,res)=>{
        try {
            const user =await User.findByIdAndDelete(req.params.id)
            AfterDelEmail(user.UserEmail,user.UserName)

           if(!user){
               return res.status(404).send()
           }
           res.status(200).send(user)
        } catch (error) {
            res.status(500).send(error)
        }
    })

    router.post ('/user/login',async (req,res)=>{
        try {
            const user = await User.findByCredentials(req.body.UserEmail,req.body.Password)
            const token = await user.GenAuthToken()
            res.send({user,token})
        } catch (error) {
            res.status(400).send()
        }
    })

    router.post('/user/logout' ,auth, async(req,res)=>{
        try{
            req.user.tokens = req.user.tokens.filter((token)=>{
                return token.token !== req.token 
            })
            await req.user.save()
            res.send()
        }catch(e){
            res.status(500)
        }
    })
   router.post('/user/logoutAll',auth,async(req,res)=>{
       try {
          req.user.tokens = []
          await req.user.save()
          res.send()
       } catch (error) {
           res.status(500).send()
       }
   })


   const upload = multer({ //upload file on local directory 
    dest: 'images',
    limits:{
        fileSize: 1000000
    },
   fileFilter(req,file,cb){
       if(!file.originalname.endsWith('.jpg')){
         return cb(new Error ('Please upload a jpg file'))
       }
       cb(undefined,true)

   }

})

router.post ('/upload',upload.single('upload'), (req,res)=>{
    res.send()
},(error, req,res,next)=>{
    res.status(400).send({Error: error.message})
})





const avater = multer({
  
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(doc|docx|jpg)$/)){ /* that sytex is regular expression */
            return cb( new Error('file should be pdf or image'))
        }
        cb(undefined,true)
    }
   
})
router.post ('/user/me/avatar',auth, avater.single('avatar'),async(req,res)=>{
   const buffer = await sharp(req.file.buffer).resize({width: 220, height:250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()

res.send()

},(error, req,res, next)=>{
    res.status(400).send({Error:error.message})
})

router.delete('/user/me/avatar',auth, async(req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()

})

router.get('/user/:id/avatar', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})

    
module.exports = router