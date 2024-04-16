import Express from "express";
import errorHandlerMiddleware from "./middlewares/error-handler";
import mongoCon from "./db/connectionMD";
import "express-async-errors";
import todoRut from "./routes/todos";
import contentRut from "./routes/contents";
const app = Express();

app.use(Express.json());

app.use("/api/v1", todoRut);
app.use("/api/v1", contentRut);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await mongoCon("mongodb://localhost:27017/test");
        app.listen(port, () => {
            console.log(`connected to port : ${port} ... `);
        });
    } catch (error) {
        console.log(error);
    }
};
start();
