import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";

@Catch(Error)
export class GlobalFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.code === "EBADCSRFTOKEN") {
      response.status(404).json({ message: "Bad" });
    }

    if (exception instanceof HttpException) {
      response.status(404).json(exception.getResponse());
    }

    response.status(400).json({ message: "Unhandled server error" });
  }
}
