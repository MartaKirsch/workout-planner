//guard for checking if user is logged in

import { Request } from "express";
interface IRequest extends Request {
  session: any;
}

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: IRequest = context.switchToHttp().getRequest();
    const sess = request.session;

    if (sess.user) return true;

    // const token = request.headers;
    // console.log(token);

    throw new BadRequestException({
      message: "User was not found!",
      isUserNotFoundError: true,
      // token,
    });
  }
}
