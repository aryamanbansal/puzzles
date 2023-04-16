
// here am connecting my database to mongodb atlas

const mongoose=require("mongoose")
const env=require("dotenv")
env.config()
mongoose.set('strictQuery', false);
const connectDB=()=>{

    // console.log(process.env.Mongoose_url)
    mongoose.connect(process.env.Mongoose_url)
}


module.exports= connectDB
