import { ExecutionContext, NestInterceptor, CallHandler, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest(); // mostar de aonde venho a chamada
    const { method, url, body } = request;

    console.log(`request - ${url} , meotodo ${method} , corpo ${body}`)
    return next.handle().pipe()
  }
}