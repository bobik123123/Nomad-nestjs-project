import { Controller, Post, UseGuards, Body, Req, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from './dto';
import { UserDocument } from '../database/models/user.model';
import { authService } from './auth.service';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: authService) {}

  @ApiOperation({ summary: 'Регистрация' })
  @Post('signup')
  async signup(@Body() userData: CreateUserDto): Promise<UserDocument> {
    return await this.authService.signup(userData);
  }

  @ApiOperation({ summary: 'Логин' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() userData: LoginUserDto, @Req() req) {
    return this.authService.login(userData, req.user);
  }
}
