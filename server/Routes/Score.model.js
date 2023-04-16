const express=require("express")
const {scoreModel}=require("../Model/Score.model")

const ScoreRouter=express.Router()
 

ScoreRouter.get("/",async(req,res)=>{
    try{
        const data=await scoreModel.find()
        res.send(data)
        console.log("ALL score DATA")
    }
    catch(err){
        console.log(err) 
        res.send({"err":"Something went wrong"})  
    }
})





ScoreRouter.post("/add",async(req,res)=>{
    const userData=req.body
    try{
        let data= new scoreModel(userData)
        await data.save()
        res.send("score data has  been  added")
    }
    catch(err){
        console.log(err)
        res.send({"err":"Something went wrong"}) 
    }
})

module.exports={ScoreRouter}