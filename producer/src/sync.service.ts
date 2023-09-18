import { Global, Injectable } from '@nestjs/common';
import { Message } from 'kafkajs';

import { KafkaService } from './kafka/kafka.service';
import { MessageTypeEnum, TopicEnum } from './enums';

@Global()
@Injectable()
export class SyncService {
  constructor(private readonly kafkaService: KafkaService) {}

  async send<MessageData>(
    type: keyof typeof MessageTypeEnum,
    data: MessageData
  ) {
    const message: Message = {
      value: JSON.stringify({
        ...data,
        type
      })
    };

    return this.kafkaService.produce({
      messages: [message],
      topic: TopicEnum.CUSTOMERS
    });
  }
}
