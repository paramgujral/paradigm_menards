import { staticImplements } from './decorators/staticImplements';

/* Simple instantiated utility class 
   This will be used most often */
export class ExampleUtil {
  public exampleFunction() {
    return "Example Value";
  }
}

/* Singleton utility class.
   Usefull for when keepting state across tests */
export class ExampleSingletonUtil {
  private static _instance: ExampleSingletonUtil;
  private static _counter: number;

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public exampleFunction() {
    ExampleSingletonUtil._counter = ExampleSingletonUtil._counter + 1;
    return "Example value";
  }
}