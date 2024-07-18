import { Body, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation.pipe';
import { UserService } from 'src/user/services/user.service';
import { AuthDto, authDto } from '../dto/auth.dto';
import { compareSync } from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async login(@Body(new ZodValidationPipe(authDto)) {email, password}: AuthDto) {
    const user = await this.userService.findOne(email);
    const isValidPassword = compareSync(password, user.password);

    if (isValidPassword) {
      return 'Login realizado com sucesso!'
    } else {
      return 'Email ou senha inválidos'
    }
  }
}
