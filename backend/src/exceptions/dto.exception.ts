import { HttpException, ValidationError } from "@nestjs/common";

export class DtoException extends HttpException {
  public readonly isDtoError = true;
  public readonly errors: { property: string; message: string }[] = [];

  constructor(errors: ValidationError[]) {
    super("Invalid data!", 406);

    const transformedErrors = errors.map((err) => {
      return {
        property: err.property,
        message: Object.entries(err.constraints)[0][1],
      };
    });
    this.errors = transformedErrors;
  }
}
