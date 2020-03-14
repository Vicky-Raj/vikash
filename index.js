const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/organ",{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err)return console.log(err);
    console.log("Connected to DB");
})

app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs");
app.use("/assets",express.static("assets"))

const Patient = require("./models/patient");
const {Donor} = require("./models/donor");


const PORT = 8000;

app.route("/")
.get((req,res)=>{
    Donor.find().then(donors=>res.render("patient",{donors}))
})
.post(async(req,res)=>{
    const donor = await Donor.findById(req.body.donor).then();
    const details = {...req.body,donor:donor};
    const patient = new Patient(details);
    patient.save()
    .then(doc=>console.log(doc))
    .catch(err=>console.log(err))
    res.redirect("/");
})

app.route("/donor/create")
.get((req,res)=>{
    res.render("donor")
})
.post((req,res)=>{
    const donor = new Donor(req.body);
    donor.save()
    .then(doc=>console.log(doc))
    .catch(err=>console.log(err))
    res.redirect("/donor/create");
})

app.get("/donors",(req,res)=>{
    Donor.find().then(donors=>res.render("donors",{donors}))
})

app.route("/donor/:id")
.get((req,res)=>{
    Donor.findById(req.params.id).then(donor=>{
        res.render("donordetails",{donor});
    })
})
.post((req,res)=>{
    Donor.findById(req.params.id).then(async donor=>{
        await donor.remove();
        res.redirect("/donors");
    })
})

app.get("/patients",(req,res)=>{
    Patient.find().then(patients=>res.render("patients",{patients}))
})


app.route("/patient/:id")
.get((req,res)=>{
    Patient.findById(req.params.id).then(patient=>{
        res.render("patientdetails",{patient});
    })
})
.post((req,res)=>{
    Patient.findById(req.params.id).then(async patient=>{
        await patient.remove();
        res.redirect("/patients");
    })
})

app.listen(PORT,()=>console.log(`started listening on port ${PORT}`))
