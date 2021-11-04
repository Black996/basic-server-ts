import "reflect-metadata";

export interface DecoratorFunction {
  (target: any, key?: string, desc?: PropertyDescriptor): void;
}

export function get(path: string): DecoratorFunction {
  return function getDecorator(target: any, key?: string) {
    if (key) Reflect.defineMetadata("path", path, target, key);
  };
}
