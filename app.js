const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const path = require("path");

const app = express();
const router = express.Router();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/ovijogDB")

const userSchema = new mongoose.Schema ({
    hash: String,
    password: String
});
const User = mongoose.model("User", userSchema);

// const user = new User({
//     hash: "dhuaoidkhnwjaefhnewfjbkjhbewhjfknewhjfbh",
//     password: "123"
// })
// user.save();

app.get("/register", function(req, res){
    res.sendFile(__dirname + "/register.html")
})

app.post("/register", function(req, res){
    const email = req.body.email;
    const userPasssword = req.body.password;

    var hashEmail = crypto.createHash('md5').update(email).digest('hex');
    const user = new User({
        hash: hashEmail,
        password: userPasssword
    })
    user.save();

    res.redirect("/login");
})

app.get("/login", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/login", function(req, res){
    const email = req.body.email;
    const userPasssword = req.body.password;
    var hashEmail = crypto.createHash('md5').update(email).digest('hex');
    User.find(function (err, users) {
        if (err){
            console.log(err);
        }
        else{
            users.forEach(function(users){
                if(users.hash === hashEmail && users.password === userPasssword){
                    res.redirect("/dashboard");
                }
                else{
                    console.log("email or password was wrong !")
                }
            })
        }
    });
});

app.get("/dashboard", function(req, res){
    res.sendFile(__dirname + "/user_dashboard.html")
})

app.post("/dashboard", function (req, res){
    if (req.body.redirect === "Make New Complain" || req.body.redirect === "Complain Now"){
        res.redirect("/complain");
    }
    else if (req.body.redirect === "Complain List"){
        res.redirect("/list");
    }
    else if (req.body.redirect === "Logout"){
        res.redirect("/login");
    }
})


app.get("/complain", function (req, res){
    res.sendFile(__dirname + "/user_complain.html")
})

app.get("/list", function(req, res){
    res.sendFile(__dirname + "/user_complain_list.html")
})

app.listen(3000, function(){
    console.log("Server Running...");
})