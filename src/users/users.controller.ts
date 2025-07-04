import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUSerDto } from './dto/update-user.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/param/token-payload.param';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) { }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getOne(id);
  }

  //Criar Usuario
  @Post()
  createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  // Rota que usa o Multer para trabalhar com imagens
  @UseGuards(AuthTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async uploadImage(
    @TokenPayloadParam() userPayload: PayloadTokenDto,
    //Formato da validacao do tamanho e formato do arquivo
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /jpeg|jpg|png/g,
        })
        .addMaxSizeValidator({
          maxSize: 1 * (1024 * 1024) // tamanho 1mb
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    ) file: Express.Multer.File) {

    return this.userService.uploadUserImage(userPayload, file)
  }

  //Atualizar dados do Usuario
  @UseGuards(AuthTokenGuard)
  @Post(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UpdateUSerDto,
    @TokenPayloadParam() userPayload: PayloadTokenDto) {

    return this.userService.updateUser(id, userData, userPayload);

  }

  //Deletar Pelo id
  @UseGuards(AuthTokenGuard)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number, @TokenPayloadParam() userPayload: PayloadTokenDto) {
    return this.userService.deleteUser(id, userPayload);
  }


}
