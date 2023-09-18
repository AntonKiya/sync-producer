import { Module } from '@nestjs/common';

import { KafkaBrokerModule } from './kafka/kafka.module';
import { SyncService } from './sync.service';

@Module({
  controllers: [],
  exports: [SyncService],
  imports: [KafkaBrokerModule],
  providers: [SyncService]
})
export class SyncModule {}
