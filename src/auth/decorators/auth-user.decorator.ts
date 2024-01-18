import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const AuthUser = createParamDecorator(
  (_data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return (request as any).user;
  },
);
