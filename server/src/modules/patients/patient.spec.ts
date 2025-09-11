import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { AuthRequest } from '../../@types/user-request.type';
import { JwtService } from '@nestjs/jwt';

// Mock de um paciente, que será retornado pelo service durante os testes
const mockPatient = {
  id: 1,
  userId: 1,
  cpf: '123.456.789-00',
  birthDate: new Date('1990-01-01'),
  phone: '(11) 99999-9999',
  address: 'Rua das Flores, 123',
  healthPlan: 'SUS',
  createdAt: new Date(),
  updatedAt: new Date(),
  user: {
    id: 1,
    name: 'Fabrício',
    email: 'teste@email.com',
  },
};

describe('PatientController', () => {
  let controller: PatientController; // instância do controller que vamos testar
  let service: PatientService; // instância do service mockado

  beforeEach(async () => {
    // Criamos um módulo de teste do NestJS, simulando o módulo real
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController], // incluímos o controller que vamos testar
      providers: [
        JwtService, // se o controller ou service depende do JwtService
        {
          // Mock do PatientService
          provide: PatientService,
          useValue: {
            create: jest.fn().mockImplementation(
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              async (dto: CreatePatientDto, userId: number) =>
                // Retorna uma Promise com o paciente mockado + dados enviados no DTO
                await Promise.resolve({
                  ...mockPatient,
                  ...dto,
                }),
            ),
          },
        },
      ],
    }).compile();

    // Pegamos as instâncias do módulo de teste
    controller = module.get<PatientController>(PatientController);
    service = module.get<PatientService>(PatientService);
  });

  // Teste para verificar se o controller está definido
  it('deve estar definido', async () => {
    // Criamos um DTO de paciente, simulando os dados que o usuário enviaria
    const dto: CreatePatientDto = {
      cpf: '123.456.789-00',
      birthDate: new Date('1990-01-01'),
      phone: '(11) 99999-9999',
      address: 'Rua das Flores, 123',
      healthPlan: 'SUS',
    };

    // Mock do request que normalmente viria do Express, incluindo o usuário logado
    const mockRequest: AuthRequest = {
      user: {
        id: 1,
        email: 'teste@email.com',
        name: 'Fabrício',
        role: 'patient',
      },
    } as AuthRequest;

    // Chamamos o método create do controller com DTO e request mockado
    const result = await controller.create(dto, mockRequest);

    // Verificamos se o retorno do controller bate com o paciente mockado + DTO
    expect(result).toEqual({
      ...mockPatient,
      ...dto,
    });

    // Verificamos se o service.create foi chamado com os argumentos corretos
    // Primeiro argumento: dto enviado
    // Segundo argumento: userId do usuário logado no request
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.create).toHaveBeenCalledWith(dto, mockRequest.user.id);
  });
});
