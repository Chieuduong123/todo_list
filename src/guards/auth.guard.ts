import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TodosService } from 'src/todos/todos.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      //get token from header
      const token = request.headers.authorization.split(' ')[1];
      console.log(token);

      if (!token) {
        throw new ForbiddenException('Please provide access token');
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.usersService.findByEmail(payload.email);
      if (!user) {
        throw new BadRequestException(
          'User not belong to token, please try again',
        );
      }
      request.currentUser = user;
    } catch (error) {
      throw new ForbiddenException('Invalid token or expired');
    }
    return true;
  }
}
