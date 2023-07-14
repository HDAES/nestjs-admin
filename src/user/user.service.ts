import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { CreateTypeEnum, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    if (createUserDto.type === CreateTypeEnum.ACCOUNT) {
      // const user = await this.userRepository.findOne({
      //   where: { account: createUserDto.account },
      // });
      // console.log(user);
      // 账号注册
      return 'This action adds a new user';
    } else {
      return 'This action adds a new user';
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(account: string): UserEntity {
    return new UserEntity();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
