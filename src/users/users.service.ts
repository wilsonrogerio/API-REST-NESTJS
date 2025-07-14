import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashingServiceProtocol } from 'src/auth/hash/hashing-service';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';
import * as path from 'node:path';
import * as fs from 'node:fs/promises'
import { ResponseCreateUserDto, ResponseImageUploadUserDto, ResponseUpdateUserDto, ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(private Prisma: PrismaService, private readonly HashService: HashingServiceProtocol) { }

  //Buscar Usuario pelo id
  async getOne(userId: number): Promise<ResponseUserDto> {
    try {
      const user = await this.Prisma.user.findFirst({
        where: { id: userId },
        select: { id: true, name: true, email: true, imageUser: true, Task: true } // essa opcao retorna apenas oque e definido

      })
      if (user) {
        return user;
      }
      throw new HttpException('Usuario nao encontrado', HttpStatus.NOT_FOUND);


    } catch (error) {
      throw new HttpException('Erro ao buscar Usuario', HttpStatus.BAD_REQUEST);
    }
  }

  //Criar Usuario
  async createUser(userData: CreateUserDto): Promise<ResponseCreateUserDto> {
    try {
      const passwordHash = await this.HashService.hash(userData.password)
      const user = await this.Prisma.user.create({
        data: { name: userData.name, email: userData.email, passwordHash: passwordHash },
        select: { id: true, name: true, email: true, Task: true } // essa opcao retorna apenas oque e definido
      })
      return user

    } catch (error) {
      throw new HttpException('Algo saiu errado', HttpStatus.BAD_REQUEST)
    }
  }

  //Atualizar Usuario
  async updateUser(userId: number, userData: UpdateUserDto, userPayload: PayloadTokenDto): Promise<ResponseUpdateUserDto> {
    try {
      const user = await this.Prisma.user.findFirst({
        where: { id: userId }
      });

      if (!user) {
        throw new HttpException('Erro ao encontar o Usuario', HttpStatus.NOT_FOUND)
      }
      //Verifico se o id do token e igual ao id passado
      if (user.id !== userPayload.sub) {
        throw new HttpException('Acesso negado', HttpStatus.UNAUTHORIZED)
      }

      // Logica para atualizar os dados recebidos do usuario
      const newUserData: { name?: string, passwordHash?: string } = {
        name: userData.name ? userData.name : user.name
      };

      //Caso a senha venha e gerado um novo hash - enviado para o obj dos dados novos
      if (userData?.password) {
        const newPasswordHash = await this.HashService.hash(userData?.password);
        newUserData['passwordHash'] = newPasswordHash;
      }

      const updateUser = await this.Prisma.user.update({
        where: { id: userId },
        //Logica permite atualizar apenas name e senha
        data: {
          name: newUserData.name,
          passwordHash: newUserData?.passwordHash ? newUserData.passwordHash : user.passwordHash
        },
        select: { id: true, name: true, email: true } // essa opcao retorna apenas oque e definido
      });
      return updateUser

    } catch (error) {
      throw new HttpException('Erro ao atualizar o Usuario', HttpStatus.BAD_REQUEST)
    }
  }

  //Deletar Usuario
  async deleteUser(userId: number, userPayload: PayloadTokenDto) {
    try {
      const user = await this.Prisma.user.findFirst({
        where: { id: userId }
      })
      if (!user) {
        throw new HttpException('Erro encontar o usuario', HttpStatus.NOT_FOUND)
      }
      //Verifico se o id do token e igual ao id passado
      if (user.id !== userPayload.sub) {
        throw new HttpException('Acesso negado', HttpStatus.UNAUTHORIZED)
      }

      this.Prisma.user.delete({ where: { id: userId } })
      return { message: `Usuario deletado : ${user.name}` }
    } catch (error) {
      throw new HttpException('Erro ao deletar o Usuario', HttpStatus.BAD_REQUEST)
    }
  }

  //Metodo para upload de imagem do usuario
  async uploadUserImage(userPayload: PayloadTokenDto, file: Express.Multer.File): Promise<ResponseImageUploadUserDto> {
    try {
      //extrai o formato da imagem - ex .jpg , .png
      const extensionName = path.extname(file.originalname).toLowerCase().substring(1);
      //Renomeio a imagem com os dados do usuario
      const imageName = `image-user-${userPayload.sub}.${extensionName}`
      //Caminho aonde a imagem sera salva
      const imageLocale = path.resolve(process.cwd(), 'files', imageName)
      //Salva a imagem - local + arquivo em si
      await fs.writeFile(imageLocale, file.buffer);

      const user = await this.Prisma.user.findFirst({
        where: { id: userPayload.sub }
      });

      if (!user) {
        throw new HttpException('algo saiu errado', HttpStatus.BAD_REQUEST)
      }

      const updateUserImage = await this.Prisma.user.update({
        where: { id: user.id },
        data: { imageUser: imageName },
        select: { id: true, name: true, email: true, imageUser: true }
      })

      return updateUserImage

    } catch (error) {
      throw new HttpException('algo saiu errado', HttpStatus.BAD_REQUEST)
    }
  }
}
