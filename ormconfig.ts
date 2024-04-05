// import { DataSourceOptions } from 'typeorm';
// import * as dotenv from 'dotenv';
// dotenv.config();

// export const config: DataSourceOptions = {
//   type: 'mysql',
//   host: process.env.DB_HOST,
//   port: +process.env.DB_PORT,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   synchronize: true,
//   logging: false,
//   entities: ['dist/**/*.entity.js'],
// };

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3030,
  database: {
    host: process.env.DB_HOST,
    type: process.env.DB_TYPE,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: ['dist/**/*.entity.js'],
  },
});
