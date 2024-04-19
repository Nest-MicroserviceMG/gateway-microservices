import 'dotenv/config';
import * as joi from 'joi';

//para ver como seran las variables de entorno
interface EnvVars {
  PORT: number;

  PRODUCTS_MICROSERVICE_HOST: string;
  PRODUCTS_MICROSERVICE_PORT: number;

  ORDERS_MICROSERVICE_HOST: string;
  ORDERS_MICROSERVICE_PORT: number;
}

//defino el esquema de las variables de entorno para validarlas
const envsSchema = joi
  .object({
    PORT: joi.number().required(), //valida que sea un numero
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(), //valida que sea un string
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(), //valida que sea un numero
    ORDERS_MICROSERVICE_HOST: joi.string().required(), //valida que sea un string
    ORDERS_MICROSERVICE_PORT: joi.number().required(), //valida que sea un numero
  })
  .unknown(true); //acepta otras variables que no esten definidas

//saco el error y el valor de las variables de entorno
const { error, value } = envsSchema.validate(process.env);

//si hay un error, lanzo un error
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

//asigno las variables de entorno a una constante
const envVars: EnvVars = value;

//exporto las variables de entorno
export const envs = {
  port: envVars.PORT,

  productsMicroserviceHost: envVars.PRODUCTS_MICROSERVICE_HOST,
  productsMicroservicePort: envVars.PRODUCTS_MICROSERVICE_PORT,

  ordersMicroserviceHost: envVars.ORDERS_MICROSERVICE_HOST,
  ordersMicroservicePort: envVars.ORDERS_MICROSERVICE_PORT,
};
