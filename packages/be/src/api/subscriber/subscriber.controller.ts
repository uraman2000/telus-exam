import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';

@Controller('subscriber')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Post()
  create(@Body() createSubscriberDto: CreateSubscriberDto) {
    return this.subscriberService.create(createSubscriberDto);
  }

  @Get()
  findAll() {
    return this.subscriberService.findAll();
  }

  @Get(':phoneNumber')
  findOne(@Param('phoneNumber') phoneNumber: string) {
    return this.subscriberService.findOne(phoneNumber);
  }

  @Patch(':phoneNumber')
  update(
    @Param('phoneNumber') phoneNumber: string,
    @Body() updateSubscriberDto: UpdateSubscriberDto,
  ) {
    return this.subscriberService.update(phoneNumber, updateSubscriberDto);
  }

  @Delete(':phoneNumber')
  remove(@Param('phoneNumber') phoneNumber: string) {
    return this.subscriberService.remove(phoneNumber);
  }
}
