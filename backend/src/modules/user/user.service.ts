import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginUserDto } from "./dto/loginUser.dto";

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

  async login(userData: LoginUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        AND: [
          {
            OR: [
              {
                name: {
                  equals: userData.username,
                },
              },
              { email: { equals: userData.username } },
            ],
          },
          { password: userData.password },
        ],
      },
    });

    if (!user) {
      const foundUser = await this.prisma.user.findFirst({
        where: {
          OR: [
            {
              name: {
                equals: userData.username,
              },
            },
            { email: { equals: userData.username } },
          ],
        },
      });
      if (!foundUser) throw new Error("noUser");
      else throw new Error("wrongPasswd");
    }
    return user;
  }
}
