import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { usersId: id } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ data: updateUserDto, where: { usersId: id } });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { usersId: id } });
  }
}
