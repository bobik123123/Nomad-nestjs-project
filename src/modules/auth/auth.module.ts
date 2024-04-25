import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthConfig } from '../config/auth.config';
import { ConfigModule } from '../config/config.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { authService } from './auth.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useExisting: AuthConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [authService, UsersService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
