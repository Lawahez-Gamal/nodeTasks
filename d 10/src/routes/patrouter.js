const { json } = require('express')
const express = require('express')
const request = require('request')
const Patient = require('../models/patient')
const router = new express.Router()

router.post('/addPatient', async(req, res) => {
    const data = new Patient(req.body)
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

// router.get('/patient/:id',async (req,res)=>{
//     _id = req.params.id
//     const url =`localhost:3000/patient/${_id}`
//     data = []
//     request ( {url}, (err, respon)=>{
//     try{
//             d = json.parse(respon.body)
//             mdata= d.data
//             console.log(data);
//         // const patients = await Patient.findById(_id)
//         res.status(200).send({
//             status:1,
//             data: mdata, 
//             msg:"patient data retreived successfuly"
//         })
//     }
//     catch(e){
//         res.status(500).send({
//             status:0,
//             data: e,
//             msg: 'error loading users data'
//         })
        
//         // ,(err)=>{
//         //     res.render('404')
//         //     console.log(err)
//         // }
//     }
// })
// })

router.get('/patient/:id', async(req,res)=>{
    const _id = req.params.id
    try{
        const patient = await Patient.findById(_id)
        if(!patient){
            res.status(200).send({
                status:2,
                data:"",
                msg:"patient not found"
            })
        }
        res.status(200).send({
            status:1,
            data: patient, 
            msg:"patient data retreived successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data: e,
            msg:'error loading user data'
        })
    }
})

router.patch('/patient/:id', async(req,res)=>{
    const _id= req.params.id
    const updates = req.body
    const updatesKeys = Object.keys(req.body)
    const allowedUpdates = ["userName"]
    const validUpdates = updatesKeys.every((u)=>allowedUpdates.includes(u))
    if(!validUpdates)
        res.status(400).send({
            status:4,
            data:'',
            msg:'invalid updates'
        })
    try{
        const patient = await Patient.findByIdAndUpdate(_id, updates,{
            new:true,
            runValidators:true
        })
        if(!patient){
            res.status(200).send({
                status:2,
                data:"",
                msg:"patient not found"
            })
        }
        res.status(200).send({
            status:1,
            data: patient, 
            msg:"patient data retreived successfuly"
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

router.delete('/patient/:id', async(req,res)=>{
    const _id= req.params.id
    try{
        const patientr = await Patient.findByIdAndDelete(_id)
        if(!patient){
            res.status(200).send({
                status:2,
                data:"",
                msg:"patient not found"
            })
        }
        res.status(200).send({
            status:1,
            data: patient, 
            msg:"patient data deleted successfuly"
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
        const patient = await Patient.findByCredentials(req.body.email, req.body.pass)
        res.send({
            status:1,
            data:patient,
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
