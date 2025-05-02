import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { config } from 'dotenv';
import AdminUserSeeder from './seeds/admin-user.seeder';
config();

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  // Removed 'seeds' property as it is not part of DataSourceOptions
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await runSeeders(dataSource, {
    seeds: [AdminUserSeeder],
  });
  await dataSource.destroy();
});
