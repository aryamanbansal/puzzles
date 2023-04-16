const express = require("express")
const env = require("dotenv")
env.config()
const connectDB = require("./Config/Db")


const cors = require("cors");
const { QuizRouter } = require("./Routes/Quiz.route");
const { UserRouter } = require("./Routes/User.route");
const { ScoreRouter } = require("./Routes/Score.model");

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: "*"
  })
)

app.use("/quiz",QuizRouter)
app.use("/user",UserRouter)
app.use("/score",ScoreRouter)

//connect database
app.listen(process.env.PORT, async () => {
  try {
    await connectDB()
    console.log(`Database connected and listening to http://localhost:${process.env.port}`)
  }
  catch (err) {
    console.log(err)
    console.log("App is not listening")
  }
})