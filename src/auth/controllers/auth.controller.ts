import { Body, Controller, InternalServerErrorException, Post, Res, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { ZodValidationPipe } from '../../shared/pipe/zod-validation.pipe';
import { AuthDto, authDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body(new ZodValidationPipe(authDto)) credentials: AuthDto, @Res() res: Response) {
    try {
      const { isValidPassword, user } = await this.authService.validateUser(credentials)
      
      if (isValidPassword && user) {
        const { access_token } = await this.authService.login(user)

        res.cookie('access_token', access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Set to true in production
          maxAge: 3600000, // Cookie expiration time (1 hour)
          sameSite: 'strict', // CSRF protection
        });

        return res.status(200).json({ message: 'Logged in successfully' });
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
