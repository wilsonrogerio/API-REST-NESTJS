import { CanActivate, ExecutionContext, Inject, UnauthorizedException } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import jwtConfig from "../config/jwt-config";
import { PrismaService } from "src/app/prisma/prisma.service";

export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly JwtService: JwtService,
    private readonly Prisma: PrismaService,
    @Inject(jwtConfig.KEY)
    private readonly JwtConfig: ConfigType<typeof jwtConfig>,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    console.log("Guard")
    //Chama a funcao de verificar se o token existe
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('token invalido ou vazio')
    }
    try {

      const payload = await this.JwtService.verifyAsync(token, this.JwtConfig)

      request['user'] = payload

      const user = await this.Prisma.user.findFirst({
        where: { id: payload?.sub }
      })
      if (!user?.active) {
        throw new UnauthorizedException('Acesso negado')
      }

    } catch (error) {
      console.log(error)
      throw new UnauthorizedException('Nao autorizado')
    }
    return true
  }

  extractToken(request: Request) {
    const authorization = request.headers?.authorization
    if (!authorization || typeof authorization !== "string") {
      return
    }
    return authorization.split(' ')[1]
  }
}