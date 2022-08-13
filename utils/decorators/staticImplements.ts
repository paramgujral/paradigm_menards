// StaticImplements source from:
// https://stackoverflow.com/a/43674389

// For design-time error checking,
// allows a static to implement an interface
export function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}