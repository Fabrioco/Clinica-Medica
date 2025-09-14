import { Test, TestingModule } from '@nestjs/testing';
import { NoAuthController } from './no-auth.controller';
import { NoAuthService } from './no-auth.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtModule } from '@nestjs/jwt';

describe('NoAuthController', () => {
  let controller: NoAuthController;
  let service: NoAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoAuthController],
      providers: [
        {
          provide: NoAuthService,
          useValue: {
            forgotPassword: jest.fn().mockResolvedValue({
              message: 'Your code will expire in 10 minutes',
              expiresAt: new Date(),
            }),
            resetPassword: jest.fn().mockResolvedValue({ success: true }),
          },
        },
      ],
      imports: [JwtModule.register({ secret: 'test' })],
    }).compile();

    controller = module.get<NoAuthController>(NoAuthController);
    service = module.get<NoAuthService>(NoAuthService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('deve enviar um email (objeto com email)', async () => {
    const result = await controller.forgotPassword({ email: 't@t.com' });

    expect(result).toEqual({
      message: 'Your code will expire in 10 minutes',
      expiresAt: expect.any(Date),
    });

    expect(service.forgotPassword).toHaveBeenCalledWith('t@t.com');
  });

  it('deve passar o código e resetar a senha', async () => {
    const dto: ResetPasswordDto = {
      email: 't@t.com',
      code: 1234,
      password: 'User@123',
      confirmPassword: 'User@123',
    };

    const result = await controller.resetPassword(dto);

    expect(service.resetPassword).toHaveBeenCalledWith(
      't@t.com',
      1234,
      'User@123',
      'User@123',
    );
    expect(result).toEqual({ success: true });
  });
});
