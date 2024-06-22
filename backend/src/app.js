import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    exposedHeaders: ["set-cookie"]
  }),
);


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//route import
import todoRoutes from "./routes/todo.routes.js";
import userRoutes from "./routes/user.routes.js";

app.use("/api/v1/todo",todoRoutes);
app.use("/api/v1/user",userRoutes)



export { app };
