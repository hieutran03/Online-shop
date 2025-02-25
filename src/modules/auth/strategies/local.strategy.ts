import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@nestjs/common';
import { UsersEntiy } from 'src/modules/users/entities/users.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticationService: AuthService) {
    super({
      usernameField: 'username',
    });
  }
  async validate(username: string, password: string): Promise<UsersEntiy> {
    return this.authenticationService.getAuthenticatedUser(username, password);
  }
}
