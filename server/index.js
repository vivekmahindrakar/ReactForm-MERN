const express = require("express"); //importing express js
const mongoose = require('mongoose');
const app = express();

const bodyParser = require("body-parser");
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()) //this line suckssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss

mongoose.connect(`mongodb+srv://ValueWealth:Vivek_2021@cluster0.hxv9z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);

const schema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    Type_of_event: String,
    Email: String,
});

const Users = mongoose.model('candidate', schema);


app.get('/users', function (req, res) {
    Users.find().then(function (foundItems) {
        res.send(foundItems)
        return foundItems;
    }).catch(function (err) { console.log(err); })
    // Users.find({}, function (err, foundItems) {
    //     if (err) {

    //     } else {
    //         res.send(foundItems)
    //         return foundItems;
    //     }
    // })

})

app.post('/registerUser', async (req, res) => {


    const member = new Users(
        {
            FirstName: req.body.fname,
            LastName: req.body.lname,
            Type_of_event: req.body.event,
            Email: req.body.email,
        }
    )
    member.save();
    // member.save(function (err, result) {
    //     if (err)
    //         console.log(err);
    //     else {
    //         return result;
    //     }

    // })
})
app.post('/deleteUser', (req, res) => {
    const id = req.body.key;
    console.log(id);
    Users.findOneAndDelete({ _id: id }).then(function (docs) { console.log(docs); }).catch(function (err) { console.log(err); });



})
app.post('/updateUser', (req, res) => {
    id = req.body.key;
    fname = req.body.fname;
    email = req.body.email;
    lname = req.body.lname;

    // console.log(id+fname+email+lname);
    Users.findByIdAndUpdate({ _id: id }, { FirstName: fname, LastName: lname, Email: email }, { upsert: true }).then(function (doc) { res.send(doc); }).catch(function (err) { res.status(500).send(err); });


    //res.send(doc)
})

app.post('/getSpecificUser', (req, res) => {
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


app.listen(5000, () => {
    console.log("listening on port 5000");
})

//aninymous function
//function (){}

//simple /names function
//function nname(paramter)

//





// first you need go thriugh express js
// tula bootstrap shikhne
// download postman
















