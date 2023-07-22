import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserSevice {
  constructor(private prisma: PrismaService) {}

  async create(data: UserDto) {
    console.log(data);
    const blog = await this.prisma.blogs.create({
      data: {
        title: data.title,
        description: data.description,
        author: data.author,
        userId: data.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return blog;
  }
  async findAll() {
    return await this.prisma.blogs.findMany();
  }
  async findOne(id: number) {
    return await this.prisma.blogs.findUnique({
      where: {
        id: parseInt(id.toString()),
      },
    });
  }
}
