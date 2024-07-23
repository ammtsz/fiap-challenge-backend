import { Body, Controller, InternalServerErrorException, Post, UnauthorizedException } from '@nestjs/common';
import { ZodValidationPipe } from '../../shared/pipe/zod-validation.pipe';
import { AuthDto, authDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body(new ZodValidationPipe(authDto)) credentials: AuthDto) {
    try {
      const { isValidPassword, user } = await this.authService.validateUser(credentials)
      
      if (isValidPassword && user) {
        return this.authService.login(user);
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      if(error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Usuário ou senha inválidos');
      } else {
        throw new InternalServerErrorException('Erro interno do servidor, por favor tente novamente mais tarde');
      }
    }
  }
}
