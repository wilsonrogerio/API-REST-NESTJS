import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';
import { TokenPayloadParam } from 'src/auth/param/token-payload.param';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  // Endpoint to get all tasks with pagination
  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  getAll() {
    return this.tasksService.getAll()
  }
  // Endpoint to get a single task by ID
  @Get(":id")
  @ApiOperation({ summary: 'Get a single task by id' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of task' })
  getSingle(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);

  }

  // Endpoint to create a new task
  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new task' })
  @Post()
  createTask(@Body() body: CreateTaskDto, @TokenPayloadParam() userPayload: PayloadTokenDto) {
    return this.tasksService.createTask(body, userPayload);
  }

  // Endpoint to update an existing task
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update task by id' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of task' })
  @UseGuards(AuthTokenGuard)
  @Patch("/update/:id")
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() taskData: UpdateTaskDto, @TokenPayloadParam() userPayload: PayloadTokenDto) {
    return this.tasksService.updateTask(id, taskData, userPayload);
  }

  // Endpoint to delete a task by ID
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a task' })
  @UseGuards(AuthTokenGuard)
  @Delete(":id")
  deleteTask(@Param('id', ParseIntPipe) id: number, @TokenPayloadParam() userPayload: PayloadTokenDto) {
    return this.tasksService.deleteTask(id, userPayload);
  }

}
