import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserModel } from 'src/databases/models/user.model';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: any = context.switchToHttp().getRequest();
    const token: { access_token: string } = request.cookies.Authorization;
    if (!token) {
      throw new UnauthorizedException();
    }
    const payload: any = await this.jwtService.decode(token.access_token, {
      json: true,
    });
    const user: UserModel = await this.usersService.findOne(payload.user_id);

    // 💡 We're assigning the payload to the request object here
    // so that we can access it in our route handlers
    request.user = user;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
