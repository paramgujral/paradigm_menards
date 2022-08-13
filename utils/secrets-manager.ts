import { staticImplements } from "./decorators/staticImplements";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

/* Couldn't get decorators working without a lot of extra configuration. Commented out for now. */ 

// // Generic interface for a SecretManager
export interface ISecretManager {
  getSecret(key: string): string;
}

// // .env-file versrion of SecretManager
// staticImplements<ISecretManager>()
class DotEnvSecretManager implements ISecretManager {
  // public static getSecret(key: string): string {
  //   return process.env[key];
  // }
  public getSecret(key: string): string {
    return process.env[key];
  }
}

// Azure Key Vault version of SecretManager
// @staticImplements<ISecretManager>()
class AzureKeyVaultSecretManager implements ISecretManager {
  // public static getSecret(key: string): string {
  //   return "Example value"; //TODO: implement
  // }
  public getSecret(key: string): string {
    return "Example value"; //TODO: implement
  }
}

// Generic SecretManager which decides correct implementation based on env setting
// @staticImplements<ISecretManager>()
export class SecretManager {
  private static _instance: ISecretManager;
  private static _cache: Map<string, string> = new Map();

  private static determineInstance() {
    if (!this._instance) {
      const configuredSecretManager = process.env.SECRET_STORE || "dotenv";
      switch (configuredSecretManager) {
        case "Azure":
          this._instance = new AzureKeyVaultSecretManager();
          break;
        case "dotenv":
        default:
          this._instance = new DotEnvSecretManager();
          break;
      }
    }
  }

  private constructor() {}

  private static get Instance() {
    SecretManager.determineInstance();
    return this._instance;
  }

  public static getSecret(key: string, cache: boolean = true): string {
    if (cache && SecretManager._cache.has(key)) {
      return SecretManager._cache.get(key);
    }
    const value = SecretManager.Instance.getSecret(key);
    if (cache) {
      SecretManager._cache.set(key, value);
    }
    return value;
  }
}
