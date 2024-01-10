import mongoose from "mongoose";

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected To DB");
        return true
    } catch (error) {
        console.error("Error Whit Connection To DataBase",error);
        return false
    }
}

export default connection