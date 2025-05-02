import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entities/user.entity';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class AuthService extends PassportSerializer {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async loginWithCredentials(
    loginRequestDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    const { email, password } = loginRequestDto;
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateJwtToken(user);
  }

  async login(user: User): Promise<LoginResponseDto> {
    return this.generateJwtToken(user);
  }

  private async generateJwtToken(user: User): Promise<LoginResponseDto> {
    const payload = {
      sub: user.id,
      email: user.email,
      userType: user.userType,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  serializeUser(user: any, done: (err: any, user: any) => void) {
    done(null, user.id);
  }

  async deserializeUser(id: string, done: (err: any, user: any) => void) {
    const user = await this.usersService.findOne(id);
    done(null, user);
  }
}
