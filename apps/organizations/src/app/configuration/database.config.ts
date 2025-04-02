// // src/config/typeorm.config.ts
// import { DataSource, DataSourceOptions } from 'typeorm';
// import { config } from 'dotenv';
// import path from 'path';
// console.log("PATH",path);
// config();

// export const typeOrmConfig: DataSourceOptions = {
//   type: 'postgres',
//   host: process.env.DB_HOST || 'localhost',
//   port: parseInt(process.env.DB_PORT || '5432', 10),
//   username: "postgres",//process.env.DB_USERNAME,
//   password: "postgres",//process.env.DB_PASSWORD,
//   database: "organizations_db_nest",//process.env.DB_NAME,
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
//   synchronize: false,
//   logging: true,
// };

// export const dataSource = new DataSource(typeOrmConfig);
// src/config/typeorm.config.ts
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'path';

// Load environment variables
config({ path: join(__dirname, '../../.env') });

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../infrastructure/migrations/*{.ts,.js}')],
  synchronize: false,
});
