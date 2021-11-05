import "reflect-metadata";
import MetadataKeys from "./MetadataKeys";
import Methods from "./Methods";

export interface DecoratorFunction {
  (target: any, key?: string, desc?: PropertyDescriptor): void;
}

function routeBinder(method: string) {
  return function methodWithPath(path: string): DecoratorFunction {
    return function getDecorator(target: any, key?: string) {
      if (key) {
        Reflect.defineMetadata(MetadataKeys.path, path, target, key);
        Reflect.defineMetadata(MetadataKeys.method, method, target, key);
      }
    };
  };
}

const get = routeBinder(Methods.get);
const post = routeBinder(Methods.post);
const put = routeBinder(Methods.put);
const del = routeBinder(Methods.del);
const patch = routeBinder(Methods.patch);

export { get, post, put, del, patch };
