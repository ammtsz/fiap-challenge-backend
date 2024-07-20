import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { UserService } from 'src/user/services/user.service';
import { IUser } from 'src/user/entities/models/user.interface';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser({ email, password }: AuthDto): Promise<any> {
    const user = await this.usersService.findOne(email);
    const isValidPassword = user && compareSync(password, user.password);

    return { user, isValidPassword }
  }

  async login(user: IUser) {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      roles: user.role,
    };

    return { access_token: this.jwtService.sign(payload) };
  }
}