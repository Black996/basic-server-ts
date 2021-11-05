import { NextFunction, Request, Response } from "express";
import { bodyValidator, controller, get, post, use } from "./decorators";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

@controller("/auth")
class LoginController {
  @get("/login")
  getLoginForm(req: RequestWithBody, res: Response): void {
    res.send(`
      <form method="POST" target="/login">
      <div>
          <label>Email</label>
          <input name="email"/>
      </div>
      <div>
      <label>Password</label>
      <input type="password" name="password"/>
      </div>
      <button>Submit</button>
     </form>
     `);
  }

  @post("/login")
  @bodyValidator("email", "password")
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;
    if (email == "hi" && password == "pass") {
      req.session = { loggedIn: true };
      res.redirect("/");
    } else {
      res.send("You must provide a valid email and password");
    }
  }

  @get("/logout")
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect("/");
  }
}

export default LoginController;
