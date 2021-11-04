import { Router, Request, Response, NextFunction } from "express";

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403).send("Not permitted");
}

export const router = Router();

router.get("/login", (req: RequestWithBody, res: Response) => {
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
});

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;
  if (email && password && email == "hi" && password == "pass") {
    req.session = { loggedIn: true };
    res.redirect("/");
  } else {
    res.send("You must provide a valid email and password");
  }
});

router.get("/logout", (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect("/");
});

router.get("/protected", requireAuth, (req: Request, res: Response) => {
  res.send("Welcome to the protected route!");
});
