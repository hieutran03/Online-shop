import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
config();

const configService = new ConfigService();

export default new DataSource({
  type: "postgres",
  host: configService.get('NODE_ENV') === 'production' ? configService.getOrThrow('POSTGRES_HOST') : 'localhost',
  port: configService.getOrThrow('POSTGRES_PORT'),
  database: configService.getOrThrow('POSTGRES_DB'),
  username: configService.getOrThrow('POSTGRES_USER'),
  password: configService.getOrThrow('POSTGRES_PASSWORD'),
  // migrations: ["migrations/**"],
  // entities: [`${__dirname}/**/*.entity.{ts,js}`]
  entities: [`${__dirname}/dist/**/*.entity.{ts,js}`],
  migrations: ['dist/migrations/*{.ts,.js}'],
});