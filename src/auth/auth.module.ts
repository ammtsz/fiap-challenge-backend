import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
})

export class AuthModule {}
