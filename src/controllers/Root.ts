import { Request, Response, NextFunction } from "express";
import { controller, get, use } from "./decorators";

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403).send("Not permitted");
}

@controller("")
class RootController {
  @get("/")
  getRoot(req: Request, res: Response) {
    if (req.session) {
      req.session.loggedIn
        ? res.send(`
                <div>
                   <p>You are logged in</p>
                   <a href="/auth/logout">Logout</a>
                </div>
            `)
        : res.send(`
              <div>
                <p>You are not logged in</p>
                <a href="/auth/login">Login</a>
              </div>
            `);
    }
  }

  @get("/protected")
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send("Welcome to the protected route!");
  }
}

export default RootController;
