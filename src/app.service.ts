import { Injectable } from '@nestjs/common';
import * as userData from './data/default-user.json';
import { UsersService } from './resources/users/users.service';
import { hashPassword } from './utils/password-utils';

@Injectable()
export class AppService {
  constructor(private readonly usersService: UsersService) {}

  async onApplicationBootstrap() {
    const superadmin = await this.usersService.findOneByRole('SUPER_ADMIN');
    if (!superadmin) {
      const hashedPassword = await hashPassword(userData.password);
      delete userData.password;
      const createdUser = await this.usersService.create({ ...userData, password: hashedPassword });
    }
  }
}
