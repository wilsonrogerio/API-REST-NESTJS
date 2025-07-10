import { PrismaService } from 'src/app/prisma/prisma.service';
import { UsersService } from "./users.service"
import { HashingServiceProtocol } from "src/auth/hash/hashing-service"
import { Test, TestingModule } from "@nestjs/testing"
import { CreateUserDto } from './dto/create-user.dto';
import { umask } from 'process';

describe('UserService ', () => {
  let prismaService: PrismaService
  let userService: UsersService
  let hashService: HashingServiceProtocol

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: { create: jest.fn() }
          }
        },
        {
          provide: HashingServiceProtocol,
          useValue: { hash: jest.fn() }
        }

      ]
    }).compile()

    userService = module.get<UsersService>(UsersService)
    prismaService = module.get<PrismaService>(PrismaService)
    hashService = module.get<HashingServiceProtocol>(HashingServiceProtocol)
  })
  it('Verifica se usersfoi definido de forma correta', () => {
    expect(userService).toBeDefined()
  })

  it('should create a new user', async () => {


    const userDto: CreateUserDto = {
      name: 'Wilson',
      email: 'email@email.com',
      password: '1234'
    }

    jest.spyOn(hashService, 'hash').mockResolvedValue('test_exemplo')
    await userService.createUser(userDto)
    expect(hashService.hash).toHaveBeenCalled()
    expect(prismaService.user.create).toHaveBeenCalledWith({
      data: { name: userDto.name, email: userDto.email, passwordHash: 'test_exemplo' },
      select: { id: true, name: true, email: true, Task: true } // essa opcao retorna apenas oque e definido
    })
  })
})