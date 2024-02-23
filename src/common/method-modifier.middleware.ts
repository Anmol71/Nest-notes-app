import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MethodModifierMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    console.log('Request...', req.body);
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      req.method = req.body._method;
    }
    next();
  }
}
