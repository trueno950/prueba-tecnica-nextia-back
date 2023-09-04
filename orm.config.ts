import { DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'inssoft_main_db',
  synchronize: true,
  entities: ["dist/**/*.entity{.ts,.js}"],
};
export default config;
