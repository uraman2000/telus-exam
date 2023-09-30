import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { Subscriber } from './entities/subscriber.entity';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class SubscriberService {
  @InjectRepository(Subscriber)
  private readonly subscriberRepository: Repository<Subscriber>;

  private relations = ['callForwardNoReply'];

  async create(createSubscriberDto: CreateSubscriberDto): Promise<Subscriber> {
    const newSubscriber = this.subscriberRepository.create(createSubscriberDto);
    return await this.subscriberRepository.save(newSubscriber);
  }

  async findAll(): Promise<Subscriber[]> {
    return await this.subscriberRepository.find({ relations: this.relations });
  }

  async findOne(phoneNumber: string): Promise<Subscriber[]> {
    const subscriber = await this.subscriberRepository.find({
      where: { phoneNumber: phoneNumber },
    });

    if (!subscriber) {
      throw new NotFoundException(
        `Subscriber with phone number ${phoneNumber} not found`,
      );
    }

    return subscriber;
  }

  async update(
    phoneNumber: string,
    updateSubscriberDto: UpdateSubscriberDto,
  ): Promise<any> {
    return await this.subscriberRepository.update(
      { phoneNumber: phoneNumber },
      updateSubscriberDto,
    );
  }

  async remove(phoneNumber: string): Promise<any> {
    return await this.subscriberRepository.delete({ phoneNumber: phoneNumber });
  }
}
