import "reflect-metadata";
import MetadataKeys from "./MetadataKeys";
import { DecoratorFunction } from "./routes";

export function bodyValidator(...keys: string[]): DecoratorFunction {
  return function (target: any, key?: string, desc?: PropertyDescriptor) {
    if (key) Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
  };
}
