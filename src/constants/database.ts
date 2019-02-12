import { ConnectionOptions } from 'typeorm';

const DB_TYPE = 'postgres';
const DB_HOST = process.env.TYPEORM_HOST || 'localhost';
const DB_PORT = Number(process.env.TYPEORM_PORT || 5432);
const DB_USER = process.env.TYPEORM_USERNAME || 'postgres';
const DB_PASS = process.env.TYPEORM_PASSWORD || '';
const DB_NAME = process.env.TYPEORM_DATABASE || 'notipush-dev';
const DB_SYNC = Boolean(process.env.TYPEORM_AUTO_SCHEMA_SYNC || true);
const TYPEORM_ENTITIES = ['dist/entity/*.js', 'dist/entity'];
const TYPEORM_SUBSCRIBERS = ['dist/subscriber/*.js', 'dist/subscriber'];
const TYPEORM_MIGRATIONS = ['dist/migration/*.js', 'dist/migration'];

export const DB_CONNECTION: ConnectionOptions = {
  synchronize: DB_SYNC,
  database: DB_NAME,
  port: DB_PORT,
  password: DB_PASS,
  username: DB_USER,
  host: DB_HOST,
  type: DB_TYPE,
  entities: TYPEORM_ENTITIES,
  subscribers: TYPEORM_SUBSCRIBERS,
  migrations: TYPEORM_MIGRATIONS,
};
