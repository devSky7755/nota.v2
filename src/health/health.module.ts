import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthApiController, HealthDbController, HealthDiskController, HealthMemoryController } from './health.controller';

@Module({
    imports: [TerminusModule],
    controllers: [HealthApiController, HealthDbController, HealthDiskController, HealthMemoryController],
})
export class HealthModule { }