import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CreateTypeEnum, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { MyCustomError } from '../common/filter/custom.error';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(REQUEST) private request: Request,
  ) {}

  /**
   * 账号注册
   * @param createUserDto
   */
  async create(createUserDto: CreateUserDto) {
    if (createUserDto.type === CreateTypeEnum.ACCOUNT) {
      console.log(createUserDto);
      const user = await this.userRepository.findOne({
        where: { account: createUserDto.account },
      });
      if (!user) {
        const newUser = new UserEntity();
        newUser.account = createUserDto.account;
        newUser.password = createUserDto.password;
        newUser.name = createUserDto.name;
        newUser.roles = [];
        newUser.last_login_ip = this.request.ip;
        return await this.userRepository.save(newUser);
      } else {
        throw new MyCustomError('该账号已被注册', 0);
      }
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
