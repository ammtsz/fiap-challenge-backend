import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserPGRepository } from './repositories/pg/user.pg.repository';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: UserPGRepository
    },
    UserService
  ],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
