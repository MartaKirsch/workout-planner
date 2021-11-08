import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginUserDto } from "./dto/loginUser.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async register(userData: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPasswd = await bcrypt.hash(userData.password, salt);

    const user = await this.prisma.user.create({
      data: {
        name: userData.username,
        email: userData.email,
        password: hashedPasswd,
      },
    });
    return user;
  }

  async login(userData: LoginUserDto) {
    const user = await this.prisma.user.findFirst({
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

    if (!user) throw new Error("noUser");

    if (await bcrypt.compare(userData.password, user.password)) {
      return user;
    } else throw new Error("wrongPasswd");
  }

  async findUser(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { name: username },
    });

    return user;
  }
}
