import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./dto/createUser.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async register(userData: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        name: userData.username,
        email: userData.email,
        password: userData.password,
      },
    });
    return user;
  }
}
