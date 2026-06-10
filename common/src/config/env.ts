import dotenv from "dotenv";

dotenv.config();

function getEnvVariable(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;

  if (!value) {
    throw new Error(`${key} must be defined`);
  }

  return value;
}

export const JWT_KEY = getEnvVariable("JWT_KEY");
export const NODE_ENV = getEnvVariable("NODE_ENV", "dev");
export const MONGO_URI = getEnvVariable("MONGO_URI");
