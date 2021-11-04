import "reflect-metadata";
import express from "express";
import { DecoratorFunction } from "./routes";

export const router = express.Router();

export function controller(routePrefix: string): DecoratorFunction {
  return function controllerDecorator(target: Function) {
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata("path", target.prototype, key);
      if (path) {
        router.get(`${routePrefix}${path}`, routeHandler);
      }
    }
  };
}
