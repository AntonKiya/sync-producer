import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from "@nestjs/config";

import { KafkaService } from './kafka.service';
import { getKafkaConnectionConfig } from './kafka.config';

@Module({
  exports: [KafkaService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: 'KAFKA',
        extraProviders: [],
        useFactory: (config: ConfigService) => getKafkaConnectionConfig(config)
      }
    ])
  ],
  providers: [KafkaService, ClientsModule]
})
export class KafkaBrokerModule {}
