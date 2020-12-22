const validator = require('validator')
const mongoose  = require('mongoose')
const Patient   = require('./patient')
const bcrypt    = require('bcryptjs')

const DoctorSchema = new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        minLength:5,
        maxLength:50
    },
    username:{
        type:String,
        required: true,
        trim: true,
        unique: true,
        minLength:6,
        maxLength:50
    },
    address:{
        type: String,
        required: true,
        trim: true,
        minLength:3,
        maxLength:50
    },
    specialize:{
        type: String,
        required: true,
        trim: true,
        minLength:7,
        maxLength:50
    },
    phone:{
        type: String,
        required: true,
        trim: true,
        minLength:11,
        maxLength:16
    },
    whatsapp:{
        type: String,
        required: true,
        trim: true,
        minLength:11,
        maxLength:16
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
    status:{
        type: Boolean, default: true
    }
})

DoctorSchema.virtual('Patient',{
    ref:'Patient', localField:'_id', foreignField:'doctor'
})

DoctorSchema.methods.toJSON=function(){
    const doc = this
    const docOBJ = doc.toObject()
    delete docOBJ.pass
    return docOBJ
}

DoctorSchema.pre('save',async function(next){
    const doc = this
    if(doc.isModified('pass'))
        doc.pass = await bcrypt.hash(doc.pass, 12)
    next()
})

DoctorSchema.statics.findByCredentials = async function(email, pass){
    const doc= await doc.findOne({ email })
    if(!doc) throw new Error('unauthorized')
    const matched = await bcrypt.compare(pass, doc.pass)
    if(!matched) throw new Error('unauthorized')
    return doc    
}

const Doctor = mongoose.model('Doctor', DoctorSchema)

module.exports = Doctor
