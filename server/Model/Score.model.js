const mongoose=require("mongoose");
const ScoreSchema=mongoose.Schema({
    name:String,
    score:Number,
    avtar:String,
    correct:Number,
    wrong:Number
    
});

const scoreModel=mongoose.model("ScoreData",ScoreSchema)
module.exports={scoreModel};