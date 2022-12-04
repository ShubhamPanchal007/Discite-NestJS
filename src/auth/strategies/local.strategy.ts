import { UnauthorizedException, Injectable } from '@nestjs/common';
//For any Passport strategy you choose, you'll always need the @nestjs/passport and passport packages. Then, you'll need to install the strategy-specific package (e.g., passport-jwt or passport-local) that implements the particular authentication strategy you are building.In addition, you can also install the type definitions for any Passport strategy, as shown above with @types/passport-local, which provides assistance while writing TypeScript code.
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
// With @nestjs/passport, you configure a Passport strategy by extending the PassportStrategy class. You pass the strategy options (item 1 above) by calling the super() method in your subclass, optionally passing in an options object. You provide the verify callback (item 2 below) by implementing a validate() method in your subclass.

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' ,});
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
