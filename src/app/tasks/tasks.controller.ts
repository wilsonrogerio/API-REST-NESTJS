import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';
import { TokenPayloadParam } from 'src/auth/param/token-payload.param';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getAll(@Query() paramsPagination: PaginationDto) {
    return this.tasksService.getAll(paramsPagination)
  }
  @Get(":id")
  getSingle(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);

  }
  @UseGuards(AuthTokenGuard)
  @Post()
  createTask(@Body() body: CreateTaskDto, @TokenPayloadParam() userPayload: PayloadTokenDto) {
    return this.tasksService.createTask(body, userPayload);
  }

  @UseGuards(AuthTokenGuard)
  @Patch("/update/:id")
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() taskData: UpdateTaskDto, @TokenPayloadParam() userPayload: PayloadTokenDto) {
    return this.tasksService.updateTask(id, taskData, userPayload);
  }

  @UseGuards(AuthTokenGuard)
  @Delete(":id")
  deleteTask(@Param('id', ParseIntPipe) id: number, @TokenPayloadParam() userPayload: PayloadTokenDto) {
    return this.tasksService.deleteTask(id, userPayload);
  }

}
