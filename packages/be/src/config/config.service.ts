import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  get mongodbUri(): string {
    return this.nestConfigService.get<string>('DB_URI');
  }
}
