import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { AuthRequest } from '../../@types/user-request.type';
import { JwtService } from '@nestjs/jwt';
import { UpdatePatientDto } from './dto/update-patient.dto';

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
            update: jest.fn().mockImplementation(
              async (id: number, dto: UpdatePatientDto) =>
                // Retorna uma Promise com o paciente mockado + dados enviados no DTO
                await Promise.resolve({
                  ...mockPatient,
                  ...dto,
                }),
            ),
            remove: jest.fn().mockImplementation(
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              async (id: number) =>
                // Retorna uma Promise sem dados, pois o paciente foi removido
                await Promise.resolve(),
            ),
            findAll: jest.fn().mockImplementation(
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              async (userId: number) =>
                // Retorna uma Promise com o paciente mockado
                await Promise.resolve({ data: [mockPatient] }),
            ),
            findById: jest.fn().mockImplementation(
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              async (id: number) =>
                // Retorna uma Promise com o paciente mockado
                await Promise.resolve(mockPatient),
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
  it('deve estar definido', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  // Teste para criar um paciente
  it('deve criar um paciente', async () => {
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

  // Teste para atualizar um paciente
  it('deve atualizar um paciente', async () => {
    const dto: UpdatePatientDto = {
      birthDate: new Date('1995-01-01'),
      phone: '(11) 55555-5555',
      address: 'Rua das Flores, 456',
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

    // Chamamos o método update do controller com DTO e request mockado
    const result = await controller.update(mockRequest, dto);

    // Verificamos se o retorno do controller bate com o paciente mockado + DTO
    expect(result).toEqual({
      ...mockPatient,
      ...dto,
    });

    // Verificamos se o service.update foi chamado com os argumentos corretos
    // Primeiro argumento: id do paciente a ser atualizado
    // Segundo argumento: dto enviado
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.update).toHaveBeenCalledWith(mockPatient.id, dto);
  });

  // Teste para deletar um paciente
  it('deve deletar um paciente', async () => {
    // Mock do request que normalmente viria do Express, incluindo o usuário logado
    const mockRequest: AuthRequest = {
      user: {
        id: 1,
        email: 'teste@email.com',
        name: 'Fabrício',
        role: 'patient',
      },
    } as AuthRequest;

    // Chamamos o método remove do controller com request mockado
    await controller.remove(mockRequest);

    // Verificamos se o service.remove foi chamado com os argumentos corretos
    // Primeiro argumento: id do paciente a ser removido
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.remove).toHaveBeenCalledWith(mockPatient.id);
  });

  // Teste para buscar um paciente
  it('deve buscar um paciente', async () => {
    // Mock do request que normalmente viria do Express, incluindo o usuário logado
    const mockRequest: AuthRequest = {
      user: {
        id: 1,
        email: 'teste@email.com',
        name: 'Fabrício',
        role: 'patient',
      },
    } as AuthRequest;

    // Chamamos o método findById do controller com request mockado
    const result = await controller.findById(mockRequest);

    // Verificamos se o retorno do controller bate com o paciente mockado
    expect(result).toEqual(mockPatient);

    // Verificamos se o service.findById foi chamado com os argumentos corretos
    // Primeiro argumento: id do paciente a ser buscado
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.findById).toHaveBeenCalledWith(mockPatient.id);
  });

  // Teste para buscar todos os pacientes
  it('deve buscar todos os pacientes', async () => {
    // Chamamos o método findAll do controller
    const result = await controller.findAll();

    // Verificamos se o retorno do controller bate com os pacientes mockados
    expect(result).toEqual({ data: [mockPatient] });

    // Verificamos se o service.findAll foi chamado
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.findAll).toHaveBeenCalled();
  });
});
