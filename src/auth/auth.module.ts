import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { jwtConstants } from './constants';
import { IsUniqueValidator } from './validations/unique.validation';
import { HashService } from './services/hash.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginService } from './commands/login.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, IsUniqueValidator, HashService, AuthGuard, LoginService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
