import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        username: configService.get('db.user', 'root'),
        password: configService.get('db.password', '123456'),
        host: configService.get('db.host', 'localhost'),
        port: configService.get('db.port', 3306),
        database: configService.get('db.database', 'db_nest'),
        synchronize: true, //是否自动将实体类同步到数据库
        retryDelay: 500,
        retryAttempts: 10, //重试连接数据库的次数
        autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
        dateStrings: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
