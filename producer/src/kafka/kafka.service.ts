import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class KafkaService implements OnApplicationBootstrap {
  private producer: Producer | null = null;

  constructor(
    @Inject('KAFKA')
    private readonly client: ClientKafka
  ) {}

  async onApplicationBootstrap() {
    this.producer = await this.client.connect();
  }

  async produce({ messages, topic }: ProducerRecord) {
    this.producer?.send({
      messages,
      topic
    });
  }
}
