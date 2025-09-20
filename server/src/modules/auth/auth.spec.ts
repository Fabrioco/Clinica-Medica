import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register.dto';
import { AuthController } from './auth.controller';
import { PasswordHelperUtils } from '../../utils/password.helper';
import { Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './dto/login.dto';

describe('AuthService', () => {
  let service: AuthService;
  let controller: AuthController;
  let passwordHelperMock: Partial<PasswordHelperUtils>;

  beforeEach(async () => {
    passwordHelperMock = {
      hashPassword: jest.fn(
        async (password: string) => await Promise.resolve(password),
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        JwtService,
        {
          provide: AuthService,
          useValue: {
            register: jest
              .fn()
              .mockImplementation(async (dto: RegisterRequestDto) => ({
                id: 1,
                name: dto.name,
                email: dto.email,
                password: await passwordHelperMock.hashPassword!(dto.password),
                createdAt: new Date(),
                updatedAt: new Date(),
                role: Role.patient,
              })),
            login: jest.fn().mockImplementation(
              async (dto: LoginRequestDto) =>
                await Promise.resolve({
                  token: 'token',
                  user: {
                    id: 1,
                    name: 'Fabrício',
                    email: dto.email,
                    role: Role.patient,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                }),
            ),
          },
        },
      ],
    }).compile();
    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('deve registrar um usuário', async () => {
    const dto: RegisterRequestDto = {
      name: 'Fabrício',
      email: 't@t.com',
      password: 'User@123',
    };

    const result = await controller.register(dto);

    expect(result).toEqual({
      id: 1,
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: Role.patient,
      createdAt: expect.any(Date) as unknown as Date,
      updatedAt: expect.any(Date) as unknown as Date,
    });

    expect(passwordHelperMock.hashPassword).toHaveBeenCalledWith(dto.password);
  });

  it('deve fazer login de um usuário', async () => {
    const dto: LoginRequestDto = {
      email: 't@t.com',
      password: 'User@123',
    };

    const result = await controller.login(dto);

    expect(result).toEqual({
      token: 'token',
      user: {
        id: 1,
        name: 'Fabrício',
        email: dto.email,
        role: Role.patient,
        createdAt: expect.any(Date) as unknown as Date,
        updatedAt: expect.any(Date) as unknown as Date,
      },
    });
  });
});
