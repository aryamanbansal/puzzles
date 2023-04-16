const mongoose = require("mongoose");
const quizSchema = mongoose.Schema({
    url: {
        type: String,

    },
    correct: {
        type: String,
    },
    question: {
        type: String,

    },
    option: {
        type: Array
    },
    level: {
        type: String
    }
});

const QuizModel = mongoose.model("quizcollection", quizSchema)
module.exports = { QuizModel }