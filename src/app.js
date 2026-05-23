import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("FreshFarmer server is running successfully");
});

export default app;