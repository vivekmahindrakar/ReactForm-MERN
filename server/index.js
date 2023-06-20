const express = require("express"); //importing express js
const mongoose = require('mongoose');
const app = express();

const bodyParser = require("body-parser");
const path = require('path');
const { count } = require("console");


//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

mongoose.connect(`mongodb+srv://ValueWealth:Vivek_2021@cluster0.hxv9z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);

//Create Schema ---> Create Model ----> Work on that model(CRUD operations)

const schema = mongoose.Schema({
    ScanQrCode: String,
    LatestScanQrCode: String,
    Label: String,
    Count: String,
});

const Users = mongoose.model('qrcode', schema);

//creating apis---------------------------------------

// CRUD - create,Read,Update,Delete

//read data from the mongodb database
app.get('/users', function (req, res) {

    Users.find().then(function (foundItems) {
        res.send(foundItems)
        return foundItems;
    }).catch(function (err) { console.log(err); })


})

//create cha function aahe ha
app.post('/registerUser', async (req, res) => {


    const member = new Users(
        {
            ScanQrCode: req.body.sqc,
            LatestScanQrCode: req.body.lsqc,
            Label: req.body.label,
            Count: req.body.count,
        }
    )
    member.save();

})
//to delete the specific user from database
app.post('/deleteUser', function (req, res) {
    const id = req.body.key;
    console.log(id);
    Users.findOneAndDelete({ _id: id }).then(function (docs) { console.log(docs); }).catch(function (err) { console.log(err); });



})
// to update specific user from the database
app.post('/updateUser', function (req, res) {
    id = req.body.key;
    sqc = req.body.sqc;
    lsqc = req.body.lsqc;
    label = req.body.label;
    coount = req.body.count

    Users.findByIdAndUpdate({ _id: id }, { ScanQrCode: sqc, LatestScanQrCode: lsqc, Label: label, Count: coount }, { upsert: true }).then(function (doc) { res.send(doc); }).catch(function (err) { res.status(500).send(err); });


    //res.send(doc)
})
//ignore
app.post('/getSpecificUser', function (req, res) {
    // Participants.find({_id:req.body.id},(err,doc)=>
    // {
    //     if(err)
    //     res.status(500).send(err);
    //     else
    //     res.send(doc);
    // })
    console.log(req.body.id);
})

const port = process.env.PORT || 4000;


app.listen(port, function () {
    console.log("listening on port" + port);
})

//aninymous function
//function (){}

//simple /names function
//function nname(paramter)

// fat arrow function





// first you need go thriugh express js
// tula bootstrap shikhne
// download postman
















