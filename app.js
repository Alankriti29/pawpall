const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const _ = require("lodash");
var path = require('path');
const { reset } = require("nodemon");
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'mysql',
    database : 'puparazzi'
})
db.connect(function(err) {
    if(err){
        throw err;
    } //signup:
    console.log('MySQL connected...');
        var pupid=209;
        var pupname = "Linda";
        var pupbreed = 'german shephard';
        var pupage = 4;
        var location="noida";
        var username="jane12";
        var pwd="op";
        var ownername="jake";
        var ownerage=9;
        var phone=9819109019;
        var sql="INSERT into profile values ("+pupid+",'"+pupname+"','"+ pupbreed +"', "+ pupage + ", '"+ location +"','"+username+"','" +pwd+"','"+ownername+"',"+ownerage+","+phone+")";
            db.query(sql,function(err,result){
              if(err) throw err;
              console.log("record created in profile"); 
    });
    //playmates:
    var pet1id=1, pet2id=2, R="F";
    var sql="INSERT into relation values ("+pet1id+","+pet2id+",'"+R+"')";
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log("record created in relation"); 
    });
    if(R=="F")
    var sql1="UPDATE relation SET status='F' where Pet2="+pet2id;
    if(R=="D")
    var sql1="Delete from relation where Pet2="+pet2id;
    db.query(sql1,function(err,result){
        if(err) throw err;
        console.log("record updated in relation"); 
    });
    //petcare:
    var petid1=1, petid2=2, Req="A"
    var sql="INSERT into petcare values ("+petid1+","+petid2+",'"+Req+"')";
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log("record created in relation"); 
    });
    if(Req=="A")
    var sql1="UPDATE request SET status='A' where Pet2="+petid2;
    if(Req=="D")
    var sql1="Delete from request where Pet2="+petid2;
    db.query(sql1,function(err,result){
        if(err) throw err;
        console.log("record updated in request"); 
    });
}) ;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res){
    res.sendFile(__dirname + "/vets.html");
});

app.get("/:pagename", function (req, res){
    const pgname = _.capitalize(req.params.pagename);
    console.log(req.params);
    if(pgname == "Home"){
        res.sendFile(__dirname + "/home.html");
    }
    if(pgname == "Sign"){
        res.sendFile(__dirname + "/sign.html");
    }
    if(pgname == "Signup"){
        res.sendFile(__dirname + "/signup.html");
    }
})

app.listen("3000", function(){
    console.log("Server started at port 3000");
})
