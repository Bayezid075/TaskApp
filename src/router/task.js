const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const { find } = require('../models/task')
const router = new express.Router()



router.post('/task',auth,async (req,res)=>{

    const TaskList = new Task(req.body)
    try{
        await TaskList.save()
        res.status(201).send(TaskList)
    }catch(e) {

        res.status(500).send(e)
    }


})

router.get('/task', async(req,res)=>{
    try {
        const user = await Task.find({})
        res.send(user).send()
    } catch (e) {
        res.status(404).send(e)
    }
})



router.get('/task/:id',async(req,res)=>{
    const _id = req.params.id
    try{
       const UserData =  await Task.findById(_id)

       if(!UserData){
           return res.status(404).send()
       }
       res.send(UserData)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/task/:id',async(req,res)=>{
     const updates = Object.keys(req.body)
     const updateTitle = ['title','describtion']
     const isgetTaskUpdate = updates.every((bingo)=> updateTitle.includes(bingo))
     if (!isgetTaskUpdate) {
         return res.status(400).send ({error: 'invalid Operations!'})
     }

    const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body,{new:true , runValidators:true})
   try {
       if(!updateTask){
           return res.status(400).send()
       }
       res.send(updateTask)
   } catch (error) {
       res.status(400).send(error)
   }
})

router.delete('/task/:id',async(req,res)=>{
    const deleteTask = await Task.findByIdAndDelete(req.params.id)
    try {
        if(!deleteTask){
            return res.status(404).send()
        }
        res.status(200).send(deleteTask)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router 