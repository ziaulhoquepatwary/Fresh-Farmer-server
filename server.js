import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import mongoose from "mongoose";


const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully!");


        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
};

startServer()