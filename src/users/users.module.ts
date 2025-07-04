import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/app/prisma/prisma.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [PrismaModule],
  exports: []
})
export class UsersModule { }
