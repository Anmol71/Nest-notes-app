import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../../users/services/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueValidator implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}
  public async validate(username: any): Promise<boolean> {
    return this.usersService.findByUserName(username).then((user) => {
      if (user) return false;
      return true;
    });
  }

  public defaultMessage(validationArguments?: ValidationArguments) {
    return `username ${validationArguments.value} already exists`;
  }
}

export function IsUnique(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueValidator,
    });
  };
}
