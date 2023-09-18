import { Module } from '@nestjs/common';

import { KafkaBrokerModule } from './kafka/kafka.module';
import { SyncService } from './sync.service';
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  controllers: [],
  exports: [SyncService],
  imports: [KafkaBrokerModule, ConfigModule.forRoot({ isGlobal: true }),],
  providers: [SyncService, ConfigModule, ConfigService]
})
export class SyncModule {}
