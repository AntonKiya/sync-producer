import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { KafkaService } from './kafka.service';
import { getKafkaConnectionConfig } from './kafka.config';

@Module({
  exports: [KafkaService],
  imports: [
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: 'KAFKA',
        useFactory: (config: ConfigService) => getKafkaConnectionConfig(config)
      }
    ])
  ],
  providers: [KafkaService, ConfigService, ClientsModule]
})
export class KafkaBrokerModule {}
