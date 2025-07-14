import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';
import { ResponseTaskDto } from './dto/reponse-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) { }
  // Busca todas as tasks
  async getAll(): Promise<ResponseTaskDto[]> {
    // // Desestruturação dos parametros de paginação
    // const { limit = 10, offset = 0 } = paramsPagination;

    const allTasks = await this.prisma.task.findMany({
      // take: limit,
      // skip: offset,
      orderBy: {//ordena da forma descresent
        createAt: "desc"
      }
    });

    return allTasks
  }
  // Busca uma unica task
  async findOne(id: number): Promise<ResponseTaskDto> {
    const task = await this.prisma.task.findFirst(
      {
        where: {
          id: id
        }
      });

    if (task?.name) {
      return task
    };
    throw new HttpException('Nao encontrado', HttpStatus.NOT_FOUND)
  }
  // Cria uma nova task
  async createTask(taskData: CreateTaskDto, userPayload: PayloadTokenDto): Promise<ResponseTaskDto> {

    try {
      const newTask = await this.prisma.task.create({
        data: {
          name: taskData.name,
          description: taskData.description,
          enable: false,
          userId: userPayload.sub
        }
      })
      return newTask;
    } catch (error) {
      console.log(error)
      throw new HttpException('Falha ao criar Task', HttpStatus.BAD_REQUEST)
    }
  }
  // Atualiza uma task
  async updateTask(id: number, taskData: UpdateTaskDto, userPayload: PayloadTokenDto): Promise<ResponseTaskDto> {
    try {
      const task = await this.prisma.task.findFirst(
        {
          where: {
            id: id
          }
        });
      if (!task) {
        throw new HttpException('Nao encontrado', HttpStatus.NOT_FOUND)
      }

      if (task.userId !== userPayload.sub) {
        throw new HttpException('Nao autorizado', HttpStatus.UNAUTHORIZED)
      }

      const newTaskData = await this.prisma.task.update({
        where: { id: task.id },
        data: {
          name: taskData?.name ? taskData?.name : task.name,
          description: taskData?.description ? taskData?.description : task.description,
          enable: taskData?.enable ? taskData?.enable : task.enable
        }
      })
      return newTaskData;
    } catch (error) {
      throw new HttpException('Falha ao atualizar', HttpStatus.NOT_FOUND)
    }
  }
  // Deleta uma task
  async deleteTask(id: number, userPayload: PayloadTokenDto) {
    try {
      const task = await this.prisma.task.findFirst(
        {
          where: {
            id: id
          }
        });
      if (!task) {
        throw new HttpException('Nao encontrado', HttpStatus.NOT_FOUND)
      }

      if (task.userId !== userPayload.sub) {
        throw new HttpException('Nao autorizado', HttpStatus.UNAUTHORIZED)
      }
      await this.prisma.task.delete({
        where: { id: task.id }
      })
      return { message: 'Deletado com sucesso' }
    } catch (error) {
      throw new HttpException('Falha ao deletar', HttpStatus.NOT_FOUND)
    }

  }


}
