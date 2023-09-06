import { DataSourceOptions } from 'typeorm';
require('dotenv').config()

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_DATABASE || 'nextia_main_db',
  synchronize: true,
  entities: ["dist/**/*.entity{.ts,.js}"],
};
export default config;