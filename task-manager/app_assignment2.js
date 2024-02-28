const express = require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const userData=require('./user.json');
const validator=require('./validator');
const axios= require('axios');
const{User,UserPreference, UserNewsPreference}=require('./models')

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
mongoose.connect('',{
    userNewUrlParser:true,
    useUnifiedTopology:true
});
const db=mongoose.connection;


app.post("/register",(req, res)=>{    
const userDetails=req.body;
const newUser=new User(userDetails);
newUser.save((err)=>{
    if(err){
        res.status(500).send("Error in registering user");
    }
    else{
        res.status(201).send("User registerted successfully");
    }
});
});

app.post("/login",async (req, res)=>{
    const loginData=req.body;
    try{
        const user= await User.findOne({userName:loginData.username});
        if(!user||user.password!=loginData.password){
            return res.status(401).json({message:"Invalid username or password"});
        }
        return res.status(200).json({message:'Login Successfully'});

    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
    }
});
  
  app.post('/preferences',(req, res)=>{
  const userNewsPreference=req.body;
  const newPreference= new User(userNewsPreference);
  newPreference.save((error)=>{ if(error){
    console.log(error);
    res.status(501).send("Server error");
  }
  else{
    res.status(200).send("Succesfully updated preference");
  }
});
});

  app.get('/preferences/:userId',async (req, res)=>{
   const userId=req.params.userId;
   try{
    const userPreferences= await UserNewsPreference.findOne({userId});
    if(!userPreferences){
        return res.status(404).json(message:"User Preference not found");
    }
    else{
        return res.status(200).json({userPreferences.newPreference});
    }
   }catch(error){
    console.error("Error getting user preference:",error);
    return res.status(500).json({message:"Internal Server error"});
   }

  });
  app.get('/fetchNews/:userId', async (req, res)=>{
   const userId=req.params.userId;
   try{
    const userPreference= await UserNewsPreference.findOne({userId});
    if(!userPreference){
        return res.status(404).json({message:"User Preference not found"});
    }
    const {categories}=userPreference.newPreference;
    const categoryQuery=Object.keys(categories).filter(category=>categories[category]).join(',');
    const apiUrl='https://newsapi.org/v2/top-headlines&category=${categoryQuery}';

    const response=await axios.get(apiUrl);
    return res.status(200).json(response.data.articles);
   }catch(error){
    console.error('Error fetching news articles:',error);
    return res.status(500).json({message:"Internal server error"});
   }
  });
  

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app;