import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: { access_token: string } = request.cookies.Authorization;
    if (!token) {
      throw new UnauthorizedException();
    }
    const payload = await this.jwtService.decode(token.access_token, {
      json: true,
    });
    // 💡 We're assigning the payload to the request object here
    // so that we can access it in our route handlers
    const user = await this.usersService.findOne(payload.user_id);

    request.user = user;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
