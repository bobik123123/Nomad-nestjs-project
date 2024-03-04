import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService{
    constructor (private readonly userServices: UsersService, private jwtService: JwtService) {}
    async signup(userData) {
        console.log(userData)
        return await this.userServices.create(userData);
    }

    async login(loginData: LoginUserDto ) {
        try {
            const user = await this.userServices.findOneUserByEmail(loginData.email)
            if (loginData.password === user.password) {
                const email = loginData.email
                const payload = {email}
                return {acces_token: this.jwtService.sign(payload)}
            } else {
                return "нету такого"
            }
        } catch (error) {
            return "lol"
        }
    }

    async changePassword(email: string, newPassword: string) {
        try {
            const user = await this.userServices.findOneUserByEmail(email);
            user.password = newPassword;
            await user.save();
            return "Password updated successfully";
        } catch (error) {
            throw new Error("Failed to update password");
        }
    }


}

