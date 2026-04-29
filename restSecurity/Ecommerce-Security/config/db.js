import mongoose from "mongoose";

const connectDb = async(req , res) =>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/newDB");
        console.log("Db Connected");     
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}