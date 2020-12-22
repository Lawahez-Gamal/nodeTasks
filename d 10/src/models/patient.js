const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt    = require('bcryptjs')

const PatientSchema = new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        minLength:5,
        maxLength:50
    },
    userName:{
        type:String,
        required: true,
        trim: true,
        unique: true,
        minLength:5,
        maxLength:50
    },
    history:{
        type: String,
        trim: true,
        minLength:10,
        maxLength:300
    },
    email:{
        type:String,
        required: true,
        unique: true,
        trim:true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error ('invalid email')
        }
    },
    pass:{
        type:String,
        minLength:6,
        maxLength:100,
        trim:true ,
        validate(value){
            if(value.toLowerCase().includes(' 12')) throw new Error('invalid pass')
        }
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor'
    }
})

PatientSchema.methods.toJSON=function(){
    const patient = this
    const patientOBJ = patient.toObject()
    delete patientOBJ.pass
    return patientOBJ
}

PatientSchema.pre('save',async function(next){
    const patient = this
    if(patient.isModified('pass'))
    patient.pass = await bcrypt.hash(patient.pass, 8)
    next()
})

PatientSchema.statics.findByCredentials = async function(email, pass){
    const patient= await Patient.findOne({ email })
    if(!patient) throw new Error('unauthorized')
    const matched = await bcrypt.compare(pass, patient.pass)
    if(!matched) throw new Error('unauthorized')
    return patient   
}

const Patient = mongoose.model('Patient', PatientSchema)

module.exports = Patient