import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';

@Module({
  imports: [TasksModule, PrismaModule, UsersModule, AuthModule,
    //Expoem o caminho da imagem, para ser acessada via requisicao
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'files'),//caminho aonde esato salvas as imagens
      serveRoot: "/files"//nome do caminho da url que sera buscado
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL
    })
  }
}
