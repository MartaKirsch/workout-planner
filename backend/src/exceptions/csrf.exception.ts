import { BadRequestException } from "@nestjs/common";

export class CsrfException extends BadRequestException {
  constructor() {
    super({ message: "You have not been authenticated" });
  }
}
