import { Test, TestingModule } from '@nestjs/testing';
import { UserstoryController } from './userstory.controller';

describe('UserstoryController', () => {
  let controller: UserstoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserstoryController],
    }).compile();

    controller = module.get<UserstoryController>(UserstoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
