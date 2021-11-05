import "reflect-metadata";
import { DecoratorFunction } from "./routes";
import AppRouter from "../../AppRouter";
import Methods from "./Methods";
import MetadataKeys from "./MetadataKeys";
import { NextFunction, RequestHandler, Request, Response } from "express";

function bodyValidator(keys: string[]): RequestHandler {
  return function validatorMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (!req.body) {
      res.status(422).send("Please Enter your account info!");
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing field ${key}`);
        return;
      }
    }
    next();
  };
}

export function controller(routePrefix: string): DecoratorFunction {
  return function controllerDecorator(target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      const validateReqBody =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];

      const validator = bodyValidator(validateReqBody);

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
