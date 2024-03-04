import {
    Controller,
    Post,
    Body,
    Put,
  } from '@nestjs/common';
import { AuthService } from './auth.services';
import { LoginUserDto } from './dto/user-login.dto';
  
@Controller("auth")
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post("signup")
    async signup(@Body() userData) {
        try {
            return await this.authService.signup(userData);
        } catch(error) {
            return error.data
        }
    }

    @Post("login")
    async login(@Body() userLogin: LoginUserDto) {
        try {
            return await this.authService.login(userLogin)
        } catch(error) {
            return error.data
        }
    }

    @Put("change-password")
    async changePassword(@Body() changePasswordData: { email: string, newPassword: string }) {
        try {
            const { email, newPassword } = changePasswordData;
            return await this.authService.changePassword(email, newPassword);
        } catch (error) {
            return error.data;
        }
    }

    
    
}