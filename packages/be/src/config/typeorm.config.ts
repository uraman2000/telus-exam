import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = async (): Promise<TypeOrmModuleOptions> => ({
  type: 'mongodb',
  url: process.env.DB_URI,
  synchronize: true,
  useUnifiedTopology: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
});
