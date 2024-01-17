import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  saltOrRounds = 10;
  password = 'random_password';
  hash = bcrypt.hash(this.password, this.saltOrRounds);
}
