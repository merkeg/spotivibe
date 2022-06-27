import { CacheModule, Module } from "@nestjs/common";
import { QueueController } from "./queue.controller";
import { QueueService } from "./queue.service";

@Module({
  providers: [QueueService],
  exports: [],
  imports: [CacheModule.register({ ttl: 60 * 30 })],
  controllers: [QueueController],
})
export class QueueModule {}
