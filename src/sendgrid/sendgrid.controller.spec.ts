import { Test, TestingModule } from '@nestjs/testing';
import { SGEmailController } from './sendgrid.controller';

describe('SGEmailController', () => {
  let controller: SGEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SGEmailController],
    }).compile();

    controller = module.get<SGEmailController>(SGEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
