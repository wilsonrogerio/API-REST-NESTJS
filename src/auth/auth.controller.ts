import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post()
  @ApiOperation({ summary: 'User login' })
  onLogin(@Body() userInfo: SignInDto) {
    return this.authService.onLogin(userInfo);
  }
}
