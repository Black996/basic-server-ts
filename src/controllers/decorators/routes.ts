import "reflect-metadata";

export interface DecoratorFunction {
  (target: any, key?: string, desc?: PropertyDescriptor): void;
}

function routeBinder(method: string) {
  return function methodWithPath(path: string): DecoratorFunction {
    return function getDecorator(target: any, key?: string) {
      if (key) {
        Reflect.defineMetadata("path", path, target, key);
        Reflect.defineMetadata("method", method, target, key);
      }
    };
  };
}

const get = routeBinder("GET");
const post = routeBinder("POST");
const put = routeBinder("PUT");
const del = routeBinder("DELETE");
const patch = routeBinder("PATCH");

export { get, post, put, del, patch };
