import "reflect-metadata";
import { DecoratorFunction } from "./routes";
import AppRouter from "../../AppRouter";
import Methods from "./Methods";
import MetadataKeys from "./MetadataKeys";

export const router = AppRouter.getInstance();

export function controller(routePrefix: string): DecoratorFunction {
  return function controllerDecorator(target: Function) {
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

      if (path) {
        router[method](`${routePrefix}${path}`, routeHandler);
      }
    }
  };
}
