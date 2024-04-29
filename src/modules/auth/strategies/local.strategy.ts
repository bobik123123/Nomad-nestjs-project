import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { authService } from '../auth.service';
import { UserRepository } from 'src/modules/database/repositories/user.repository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: authService,
    private userRepositroy: UserRepository
  ) {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    const userEmail = await this.userRepositroy.findOne( {email} )
    if (userEmail && !user) {
      userEmail.attempts += 1
      if (userEmail.attempts >= 3 && !userEmail.isBlocked) {
        userEmail.blockedUntil = new Date(new Date().getTime() + 10 * 60000); 
        userEmail.isBlocked = true;
        await userEmail.save();
      }
      await userEmail.save()
    }
    if (!user || userEmail.isBlocked) {
      if (userEmail && userEmail.isBlocked && userEmail.blockedUntil > new Date()) {  
        throw new UnauthorizedException(`ВАШ АККАУНТ ЗАБЛАКИРАВАН НА ДЕСЯТ СЕКУНД, Осталось ${Math.floor((userEmail.blockedUntil.getTime() - new Date().getTime())  / 60000)} минут`, 'too many attemtps :3');
      } else if (userEmail && userEmail.isBlocked && userEmail.blockedUntil <= new Date()) {
        userEmail.isBlocked = false;
        userEmail.attempts = 0;
        await userEmail.save();
      } else {
        throw new UnauthorizedException('Такого пользователя нету', 'Unauthorized');
      }
    }
    userEmail.attempts = 0
    userEmail.isBlocked = false
    await userEmail.save()
    return user;
  }
}
