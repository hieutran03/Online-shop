import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseOptions } from 'src/config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(databaseOptions),
  ]
})
export class DatabaseModule {}