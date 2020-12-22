const express = require('express')
const Doctor = require('../models/doctor')
const router = new express.Router()

router.post('/addDoctor', async(req, res) => {
    const data = new Doctor(req.body)
    try{
        await data.save()
        res.status(200).send({
            status:1,
            data: data,
            msg: 'data inserted'
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data:e,
            msg:'error inserting data'
        })
    }
})

router.get('/allDoctor',async (req,res)=>{
    try{
        const doctors = await Doctor.find({})
        res.status(200).send({
            status:1,
            data: doctors,
            msg: 'all doctors selected'
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data: e,
            msg: 'error loading doctors data'
        })
    }
})

router.get('/doctor/:id', async(req,res)=>{
    const _id = req.params.id
    try{
        const doc = await Doctor.findById(_id)
        if(!doc){
            res.status(200).send({
                status:2,
                data:"",
                msg:"doctor not found"
            })
        }
        res.status(200).send({
            status:1,
            data: doc, 
            msg:"doctor data retreived successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data: e,
            msg:'error loading doctor data'
        })
    }
})

router.patch('/doctor/:id', async(req,res)=>{
    const _id= req.params.id
    const updates = req.body
    const updatesKeys = Object.keys(req.body)
    const allowedUpdates = ["username","email"]
    const validUpdates = updatesKeys.every((u)=>allowedUpdates.includes(u))
    if(!validUpdates)
        res.status(400).send({
            status:4,
            data:'',
            msg:'invalid updates'
        })
    try{
        const doc = await Doctor.findByIdAndUpdate(_id, updates,{
            new:true,
            runValidators:true
        })
        if(!doc){
            res.status(200).send({
                status:2,
                data:"",
                msg:"doctor not found"
            })
        }
        res.status(200).send({
            status:1,
            data: doc, 
            msg:"doctor data retreived successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            statue: 0,
            data:'',
            msg:"error edit data"
        })
    }
})

router.delete('/doctor/:id', async(req,res)=>{
    const _id= req.params.id
    try{
        const doc = await Doctor.findByIdAndDelete(_id)
        if(!doc){
            res.status(200).send({
                status:2,
                data:"",
                msg:"doctor not found"
            })
        }
        res.status(200).send({
            status:1,
            data: doc, 
            msg:"doctor data deleted successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            statue: 0,
            data:'',
            msg:"error delete data"
        })
    }
})

router.post('/login', async(req,res)=>{
    try{
        const doc = await Doctor.findByCredentials(req.body.email, req.body.pass)
        res.send({
            status:1,
            data:doc,
            msg:"logged in"
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data:"",
            msg:"err in data"
        })
    }
})
module.exports=router
