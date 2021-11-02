import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";
import { CsrfException } from "src/exceptions/csrf.exception";

@Catch(Error)
export class GlobalFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.code === "EBADCSRFTOKEN") {
      // response.status(400).json({ message: "You have not been authenticated" });
      response.status(400).json(new CsrfException().getResponse());
      return;
    }

    if (exception instanceof HttpException) {
      response.status(404).json(exception.getResponse());
      return;
    }

    response.status(400).json({ message: "Unhandled server error" });
  }
}
