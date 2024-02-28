const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    full_name:String,
    age:Number,
    country:String,
    gender:String
});
const userNewsPreferenceSchema= new mongoose.Schema({
    userId: String,
    newPreferences:{
        sports:Boolean,
        technology:Boolean,
        entertainment:Boolean,
        health:Boolean,
        business:Boolean,
        politics:Boolean
    }
});
 module.exports={
User:mongoose.model('User',userSchema),
UserNewsPreference:mongoose.model('UserNewsPreference',userNewsPreferenceSchema)
 };