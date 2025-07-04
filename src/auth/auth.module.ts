import { Global, Module } from '@nestjs/common';
import { BcryptPasswordService } from './hash/bcrypt-password.service';
import { HashingServiceProtocol } from './hash/hashing-service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/app/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt-config';
import { JwtModule } from '@nestjs/jwt';

//Modulo global pode ser acessado de toda aplicacao
@Global()
@Module({
  providers: [{
    provide: HashingServiceProtocol,
    useClass: BcryptPasswordService
  }, AuthService],
  exports: [
    HashingServiceProtocol,
    JwtModule, ConfigModule
  ],
  imports: [PrismaModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider())],
  controllers: [AuthController]
})
export class AuthModule { }
