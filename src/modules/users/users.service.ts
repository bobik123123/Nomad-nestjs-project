import { Injectable } from '@nestjs/common';
import { UserRepository } from '../database/repositories/user.repository';
import { UserDocument } from '../database/models/user.model';
import { CrudService } from '../../helpers/crud.service';

@Injectable()
export class UsersService extends CrudService<UserDocument> {
  constructor(readonly userRepository: UserRepository) {
    super(userRepository);
  }

  async create(createUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async findOneUserByEmail(email: string):  Promise<UserDocument> {
    try {
      return await this.userRepository.findOne({email});
    } catch (error) {
      return error.message;
    }
  }
}
