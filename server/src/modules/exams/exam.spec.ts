import { Test, TestingModule } from '@nestjs/testing';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { JwtService } from '@nestjs/jwt';
import { AuthRequest } from 'src/@types/user-request.type';
import { Exam } from '@prisma/client';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

const mockRequest: AuthRequest = {
  user: {
    id: 1,
    email: 't@t.com',
    name: 'Fabricio',
    role: 'doctor',
  },
} as AuthRequest;

const mockExam: Exam = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  doctorId: 1,
  patientId: 1,
  appointmentId: 1,
  name: 'Hemograma',
  resultDate: new Date(),
  resultFile: 'https://example.com/result.pdf',
};

const mockCreateOrUpdateExam: CreateExamDto & UpdateExamDto = {
  appointmentId: 1,
  patientId: 1,
  doctorId: 1,
  name: 'Hemograma',
  resultFile: 'https://example.com/result.pdf',
  resultDate: new Date(),
};

describe('ExamController', () => {
  let controller: ExamController;
  let service: ExamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamController],
      providers: [
        JwtService,
        {
          provide: ExamService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockExam),
            update: jest.fn().mockResolvedValue(mockExam),
            delete: jest.fn().mockResolvedValue(mockExam.id),
            findAll: jest.fn().mockResolvedValue({ data: [mockExam] }),
            findOne: jest.fn().mockResolvedValue(mockExam),
          },
        },
      ],
    }).compile();

    controller = module.get<ExamController>(ExamController);
    service = module.get<ExamService>(ExamService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('deve criar um exame', async () => {
    const result = await controller.create(mockCreateOrUpdateExam);

    expect(result).toEqual(mockExam);

    expect(service.create).toHaveBeenCalledWith(mockCreateOrUpdateExam);
  });

  it('deve atualizar um exame', async () => {
    const result = await controller.update(
      1,
      mockCreateOrUpdateExam,
      mockRequest,
    );

    expect(result).toEqual(mockExam);

    expect(service.update).toHaveBeenCalledWith(
      1,
      mockCreateOrUpdateExam,
      mockRequest.user.id,
    );
  });

  it('deve deletar um exame', async () => {
    await controller.remove(mockRequest.user.id);

    expect(service.delete).toHaveBeenCalledWith(mockRequest.user.id);
  });

  it('deve buscar todos os exames', async () => {
    const result = await controller.findAll();

    expect(result).toEqual({ data: [mockExam] });

    expect(service.findAll).toHaveBeenCalledWith();
  });

  it('deve buscar um exame', async () => {
    const result = await controller.findOne(mockRequest.user.id);

    expect(result).toEqual(mockExam);

    expect(service.findOne).toHaveBeenCalledWith(mockRequest.user.id);
  });
});
