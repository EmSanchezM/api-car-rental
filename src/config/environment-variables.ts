import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    ACCESS_TOKEN_SECRET: joi.string().required(),
    REFRESH_TOKEN_SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const environmentVariables = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  accessTokenSecret: envVars.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: envVars.REFRESH_TOKEN_SECRET,
};
