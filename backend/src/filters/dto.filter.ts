import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { DtoException } from "src/exceptions/dto.exception";

@Catch(DtoException)
export class DtoFilter implements ExceptionFilter {
  catch(exception: DtoException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(406).json(exception);
  }
}
