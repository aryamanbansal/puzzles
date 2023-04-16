const mongoose=require("mongoose");
const UserSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    avtar:String,
    administration:Boolean
});

const userModel=mongoose.model("UserData",UserSchema)
module.exports={userModel};