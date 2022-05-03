import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SGEmailController } from './sendgrid.controller';
import { SGEmailService } from './sendgrid.service';

@Module({
  imports: [],
  controllers: [SGEmailController],
  providers: [SGEmailService],
  exports: [SGEmailService],
})
export class SGEmailModule { }
