import "reflect-metadata";
import MetadataKeys from "./MetadataKeys";
import { DecoratorFunction } from "./routes";
import { RequestHandler } from "express";

export function use(middleware: RequestHandler): DecoratorFunction {
  return function middlewareDecorator(
    target: any,
    key?: string,
    desc?: PropertyDescriptor
  ) {
    if (key) {
      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];
      Reflect.defineMetadata(
        MetadataKeys.middleware,
        [...middlewares, middleware],
        target,
        key
      );
    }
  };
}
