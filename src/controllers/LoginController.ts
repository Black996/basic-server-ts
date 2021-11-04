import { Request, Response } from "express";
import { controller } from "./decorators/controller";
import { get } from "./decorators/routes";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

@controller("/")
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
}

export default LoginController;
