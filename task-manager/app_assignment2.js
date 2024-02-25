const express = require('express');
const userData=require('./user.json');
const validator=require('./validator');
const fs=require('fs');


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register",(req, res)=>{
var userDetails=req.body;
let val=validator.validateUserInfo(userDetails);
const userList=userData.user;
 if(val.status==true){
    userList.push(userDetails);
   fs.writeFile('./task-manager/user.json',JSON.stringify(userList),{encoding:'utf8',flag:'w'},(err,data)=>{
     if(err){
         return res.status(500).send("something went wrong");
     }
     else{
         return res.status(200).send("data is added");
     }
   })
 }
 
});

app.post("/login",(req, res)=>{
    const users=userData.users;
    var userName=req.body.userName;
    var password=req.body.password;
    let val=validator.validateUser(users,userName,password);
    
    if(val){
        return res.status(200).send("login successfully");
    }
    else{
        return res.status(500).send("something went wrong");
    }
  });

  app.get('/preferences',(req, res)=>{
    try {
        return res.status(200).send(userData);
    } catch (error) {
        return res.status(500).send("Something went wrong");
    }


  })
  app.put('/preferences',(req, res)=>{
   
  })
  app.get('/news',(req, res)=>{

  })
  

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;