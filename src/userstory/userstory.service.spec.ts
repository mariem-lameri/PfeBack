import { Test, TestingModule } from '@nestjs/testing';
import { UserstoryService } from './userstory.service';

describe('UserstoryService', () => {
  let service: UserstoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserstoryService],
    }).compile();

    service = module.get<UserstoryService>(UserstoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
