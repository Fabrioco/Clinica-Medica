import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { Appointment, AppointmentStatus } from '@prisma/client';
import { AuthRequest } from 'src/@types/user-request.type';
import { JwtService } from '@nestjs/jwt';

const mockAppointment: Appointment = {
  id: 1,
  appointmentDate: new Date(),
  createdAt: new Date(),
  doctorId: 1,
  notes: 'Some notes',
  patientId: 1,
  status: 'scheduled',
  updatedAt: new Date(),
};

const mockRequest: AuthRequest = {
  user: {
    id: 1,
    email: 't@t.com',
    name: 'Fabricio',
    role: 'doctor',
  },
} as AuthRequest;

const mockCreateOrUpdateDto = {
  appointmentDate: new Date(),
  doctorId: 1,
  notes: 'Some notes',
  patientId: 1,
  status: AppointmentStatus.scheduled,
};

describe('AppointmentsController', () => {
  let controller: AppointmentsController;
  let service: AppointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentsController],

      providers: [
        JwtService,
        {
          provide: AppointmentsService,
          useValue: {
            create: jest.fn().mockImplementation(
              async () =>
                await Promise.resolve({
                  ...mockAppointment,
                  ...mockCreateOrUpdateDto,
                }),
            ),
            update: jest.fn().mockImplementation(
              async (id: number, dto: typeof mockCreateOrUpdateDto) =>
                await Promise.resolve({
                  ...mockAppointment,
                  ...dto,
                }),
            ),
            remove: jest
              .fn()
              .mockImplementation(
                async (id: number) => await Promise.resolve(id),
              ),
            findAll: jest
              .fn()
              .mockImplementation(
                async () => await Promise.resolve({ data: [mockAppointment] }),
              ),
            findOne: jest
              .fn()
              .mockImplementation(
                async () => await Promise.resolve(mockAppointment),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<AppointmentsController>(AppointmentsController);
    service = module.get<AppointmentsService>(AppointmentsService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('deve criar um agendamento', async () => {
    const result = await controller.create(mockCreateOrUpdateDto);

    expect(result).toEqual({
      ...mockAppointment,
      ...mockCreateOrUpdateDto,
    });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.create).toHaveBeenCalledWith(mockCreateOrUpdateDto);
  });

  it('deve atualizar um agendamento', async () => {
    const result = await controller.update(
      String(mockRequest.user.id),
      mockCreateOrUpdateDto,
    );

    expect(result).toEqual({
      ...mockAppointment,
      ...mockCreateOrUpdateDto,
    });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.update).toHaveBeenCalledWith(
      mockRequest.user.id,
      mockCreateOrUpdateDto,
    );
  });

  it('deve deletar um agendamento', async () => {
    await controller.remove(String(mockRequest.user.id));

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.remove).toHaveBeenCalledWith(mockRequest.user.id);
  });

  it('deve buscar todos agendamentos', async () => {
    const result = await controller.findAll();

    expect(result).toEqual({ data: [mockAppointment] });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.findAll).toHaveBeenCalledWith();
  });

  it('deve buscar um agendamento', async () => {
    const result = await controller.findOne(String(mockRequest.user.id));

    expect(result).toEqual(mockAppointment);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.findOne).toHaveBeenCalledWith(mockRequest.user.id);
  });
});
