import { Module } from '@nestjs/common';

import { KafkaBrokerModule } from './kafka/kafka.module';
import { SyncService } from './sync.service';
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  controllers: [],
  exports: [SyncService],
  imports: [ConfigModule.forRoot({ isGlobal: true }), KafkaBrokerModule],
  providers: [SyncService, ConfigService]
})
export class SyncModule {}
