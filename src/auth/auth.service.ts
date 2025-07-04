import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma/prisma.service';
import { SignInDto } from './dto/signin.dto';
import { HashingServiceProtocol } from './hash/hashing-service';
import jwtConfig from './config/jwt-config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private Prisma: PrismaService,
    private hashervice: HashingServiceProtocol,

    //Injectar uma configuarcao externa
    @Inject(jwtConfig.KEY)
    private readonly JwtConfig: ConfigType<typeof jwtConfig>,
    private readonly JwtService: JwtService
  ) {
  }

  async onLogin(userInfo: SignInDto) {
    const user = await this.Prisma.user.findFirst({
      where: { email: userInfo.email, active: true }
    })

    if (!user) {
      throw new HttpException('Erro ao autenticar o Usuario', HttpStatus.UNAUTHORIZED)
    }
    const passwordValid = await this.hashervice.compare(userInfo.password, user.passwordHash)

    if (!passwordValid) {
      throw new HttpException('Email/Senha incorretos', HttpStatus.UNAUTHORIZED)
    }
    //gerar o token ao fazer login
    const token = await this.JwtService.signAsync({
      sub: user.id,
      email: user.email
    },
      {
        secret: this.JwtConfig.secret,
        expiresIn: this.JwtConfig.jwtTtl,
        audience: this.JwtConfig.audience,
        issuer: this.JwtConfig.issuer
      })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      imagaUser: user.imageUser,
      token: token
    }
  }
}
