import app from "./src/app.js";


let serverInstance;

const PORT = 5000;

const startServer = () => {
    serverInstance = app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    })
};

startServer()