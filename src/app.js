import express from "express";
import router from "./routes/index.js";
import errorHandler from "./middleware/error.js";

const app = express();

app.use(express.json());
app.use('/uploads', express.static('src/storage/images'))
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);

export default app;
