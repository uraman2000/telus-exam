// src/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from './config.service';

export const typeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'mongodb',
  url: configService.mongodbUri,
  synchronize: true,
  useUnifiedTopology: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
});
