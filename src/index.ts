import cookieSession from "cookie-session";
import express, { Response, Request } from "express";
import { router } from "./routes/loginRoutes";
import "./controllers/LoginController";
import AppRouter from "./AppRouter";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["crypto"] }));
app.use(router);
app.use(AppRouter.getInstance());

app.get("/", (req: Request, res: Response) => {
  if (req.session) {
    req.session.loggedIn
      ? res.send(`
      
        <div>
           <p>You are logged in</p>
           <a href="/logout">Logout</a>
        </div>
    `)
      : res.send(`
      <div>
        <p>You are not logged in</p>
        <a href="/auth/login">Login</a>
      </div>
    `);
  }
});

app.listen(3000, () => {
  console.log("Server is on");
});
