import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.services';
import { UsersService } from '../users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';


@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService, UsersService, JwtService],
})
export class AuthModule {}
