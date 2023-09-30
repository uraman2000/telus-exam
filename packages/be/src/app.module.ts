import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { ConfigAppModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigAppModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    ApiModule,
  ],
})
export class AppModule {}
