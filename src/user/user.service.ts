import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CreateTypeEnum, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { CustomError } from '../common/filter/custom.error';
import { Crypto } from '../utils/crypto';

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
        newUser.password = Crypto.encrypt(createUserDto.password);
        newUser.name = createUserDto.name;
        newUser.roles = [];
        newUser.last_login_ip = this.request.ip;
        return await this.userRepository.save(newUser);
      } else {
        throw new CustomError('该账号已被注册', 201);
      }
    } else {
      return 'This action adds a new user';
    }
  }

  /**
   * # 根据账号查询用户密码、id和name
   * @param account
   */
  async findByAccount(account: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { account },
      select: ['password', 'id', 'name'],
    });
  }

  /**
   * # 根据token 获取用户信息
   */
  async getUserInfo(): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id: this.request['user'].id },
    });
  }
}
