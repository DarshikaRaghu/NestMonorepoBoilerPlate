// src/config/typeorm.config.ts
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config();

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: "postgres",//process.env.DB_USERNAME,
  password: "postgres",//process.env.DB_PASSWORD,
  database: "organizations_db_nest",//process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  synchronize: false,
  logging: true,
};

export const dataSource = new DataSource(typeOrmConfig);