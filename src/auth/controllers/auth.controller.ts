import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginWithCredentials(
    @Body(ValidationPipe) loginRequestDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return this.authService.loginWithCredentials(loginRequestDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login-local')
  async login(@Request() req): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }
}
