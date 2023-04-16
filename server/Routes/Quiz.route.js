const express = require("express")
const { QuizModel } = require("../Model/Quiz.model")

const QuizRouter = express.Router()

//get route
QuizRouter.get("/", async (req, res) => {
    const level = req.query.level
    let data;
    try {
        if (level) {
            data = await QuizModel.find({ level: level })
            console.log(data)
        }
        else {
            data = await QuizModel.find()
        }

        res.send(data)
        console.log("All QUIZ data")
    }
    catch (err) {
        console.log(err)
        res.send({ "err": "Something went wrong" })
    }
})




//post route
QuizRouter.post("/add", async (req, res) => {
    const quizData = req.body
    try {
        await QuizModel.insertMany(quizData)

        res.send("quiz has been  added")
    }
    catch (err) {
        console.log(err)
        res.send({ "err": "Something went wrong" })
    }
})

//update
QuizRouter.patch("/update/:quizId", async (req, res) => {
    const ID = req.params.quizId;
    const payload = req.body;
    try {
        await QuizModel.findByIdAndUpdate({ _id: ID }, payload)
        res.send('Updated the quiz to the DataBase')
    }
    catch (err) {
        console.log(err)
        res.send({ "err": "Something went wrong" })
    }
})


//delete
QuizRouter.delete("/delete/:quizId", async (req, res) => {
    const ID = req.params.quizId;
    try {
        await QuizModel.findByIdAndDelete({ _id: ID })
        res.send('Deleted the quiz from the DataBase')
    }
    catch (err) {
        console.log(err)
        res.send({ "err": "Something went wrong" })
    }
})
module.exports = { QuizRouter }
