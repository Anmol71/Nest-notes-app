import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...', req.body);
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      //   const method = req.body._method;
      //   console.log(method, 'Method');
      //   delete req.body._method;
      //   return method;
      req.method = req.body._method;
    }
    next();
  }
}
