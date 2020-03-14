const mongoose = require("mongoose");


const donorSchema = new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    gender:{type:String,required:true},
    blood:{type:String,required:true},
    phone:{type:String,required:true},
    organ:{type:String,required:true},
    city:{type:String,required:true},
})

module.exports = {
    donorSchema,
    Donor:mongoose.model("Donor",donorSchema)
}