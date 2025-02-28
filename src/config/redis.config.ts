import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const isProd = configService.get('NODE_ENV') === 'production';

    const redisHost = isProd
      ? configService.get<string>('REDIS_HOST')
      : 'redis-14400.c91.us-east-1-3.ec2.redns.redis-cloud.com';
    const redisPort = isProd ? configService.get<number>('REDIS_PORT') : 14400;
    const redisUsername = isProd
      ? configService.get<string>('REDIS_USERNAME')
      : 'default';
    const redisPassword = isProd
      ? configService.get<string>('REDIS_PASSWORD')
      : 'vp2Uyw85GoZP2Y3EL7BghBl7033KXXaC';

    const store = await redisStore({
      socket: {
        host: redisHost,
        port: redisPort,
      },
      username: redisUsername,
      password: redisPassword,
    });

    return { store: () => store };
  },
  inject: [ConfigService],
};
