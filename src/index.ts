import cookieSession from "cookie-session";
import express from "express";
import AppRouter from "./AppRouter";
// import { router } from "./routes/loginRoutes";
import "./controllers/Login";
import "./controllers/Root";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["crypto"] }));
// app.use(router);
app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log("Server is on");
});
