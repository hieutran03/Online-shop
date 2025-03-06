import { ConfigService } from '@nestjs/config';
import { UserRole, UsersEntiy } from '../../modules/users/entities/users.entity';
import { DataSource } from 'typeorm';
const { config } = require('dotenv');
import * as bcrypt from 'bcrypt';
import CartEntity from '../../modules/cart/entities/cart.entity';
import { CartItemEntity } from '../../modules/cart/entities/cart-item.entity';
import { ProductEntity } from '../../modules/products/entities/product.entity';
import { CategoryEntity } from '../../modules/category/entities/category.entity';
config();

const configService = new ConfigService();



async function run() {
  const dataSource = new DataSource({
    type: 'postgres',
    host:
      configService.get('NODE_ENV') === 'production'
        ? configService.getOrThrow('POSTGRES_HOST')
        : 'localhost',
    port: configService.getOrThrow('POSTGRES_PORT'),
    database: configService.getOrThrow('POSTGRES_DB'),
    username: configService.getOrThrow('POSTGRES_USER'),
    password: configService.getOrThrow('POSTGRES_PASSWORD'),
    entities: [UsersEntiy, CartEntity, CartItemEntity, ProductEntity, CategoryEntity],
  });
  await dataSource.initialize()
  const userRepository = dataSource.getRepository(UsersEntiy);

  const hashPassword = await bcrypt.hash(
    '12345',
    parseInt(configService.get('BCRYPT_SALT_ROUNDS')),
  );
  const cart = new CartEntity({});
  const adminUser = new UsersEntiy({
    name: 'alex',
    email: 'alex@gmail.com',
    username: 'alex',
    password:  hashPassword,
    role: UserRole.ADMIN,
    cart,
  });
  await userRepository.save(adminUser);
  console.log('Admin user created successfully')
}

run()