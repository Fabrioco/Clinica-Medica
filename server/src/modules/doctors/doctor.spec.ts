import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsController } from './doctor.controller';
import { DoctorsService } from './doctor.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { AuthRequest } from 'src/@types/user-request.type';
import { Doctor } from '@prisma/client';

const mockDoctor: Doctor = {
  id: 1,
  crm: '123456',
  phone: '(11) 99999-9999',
  specialty: 'Cardiologist',
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  stripeAccountId: null,
};

const mockRequest: AuthRequest = {
  user: {
    id: 1,
    email: 't@t.com',
    name: 'Fabricio',
    role: 'doctor',
  },
} as AuthRequest;

const createDto: CreateDoctorDto = {
  crm: '123456',
  phone: '(11) 99999-9999',
  specialty: 'Cardiologist',
  userId: 1,
};

const UpdateDto: UpdateDoctorDto = {
  crm: '123456',
  phone: '(11) 99999-9999',
  specialty: 'Cardiologist',
  userId: 1,
};

describe('DoctorsController', () => {
  let controller: DoctorsController;
  let service: DoctorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorsController],
      providers: [
        JwtService,
        {
          provide: DoctorsService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation(
                async () => await Promise.resolve(mockDoctor),
              ),
            update: jest
              .fn()
              .mockImplementation(
                async (id: number, dto: UpdateDoctorDto) =>
                  await Promise.resolve(mockDoctor),
              ),
            remove: jest
              .fn()
              .mockImplementation(
                async (id: number) => await Promise.resolve(mockDoctor.id),
              ),
            findById: jest
              .fn()
              .mockImplementation(
                async (id: number) => await Promise.resolve(mockDoctor),
              ),
            findAll: jest
              .fn()
              .mockImplementation(
                async () => await Promise.resolve({ data: [mockDoctor] }),
              ),
          },
        },
      ],
    }).compile();
    controller = module.get<DoctorsController>(DoctorsController);
    service = module.get<DoctorsService>(DoctorsService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('deve criar um doutor', async () => {
    const result = await controller.create(createDto, mockRequest);

    expect(result).toEqual({
      ...mockDoctor,
      ...createDto,
    });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.create).toHaveBeenCalledWith(createDto, mockRequest.user.id);
  });

  it('deve atualizar um doutor', async () => {
    const result = await controller.update(UpdateDto, mockRequest);

    expect(result).toEqual({
      ...mockDoctor,
      ...UpdateDto,
    });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.update).toHaveBeenCalledWith(UpdateDto, mockRequest.user.id);
  });
  it('deve deletar um doutor', async () => {
    await controller.remove(mockRequest);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.remove).toHaveBeenCalledWith(mockDoctor.id);
  });

  it('deve buscar um doutor', async () => {
    const mockRequest: AuthRequest = {
      user: {
        id: 1,
        email: 't@t.com',
        name: 'Fabricio',
        role: 'doctor',
      },
    } as AuthRequest;

    const result = await controller.findById(mockRequest);

    expect(result).toEqual(mockDoctor);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.findById).toHaveBeenCalledWith(mockDoctor.id);
  });

  it('deve buscar todos os doutores', async () => {
    const result = await controller.findAll();

    expect(result).toEqual({ data: [mockDoctor] });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.findAll).toHaveBeenCalledWith();
  });
});
