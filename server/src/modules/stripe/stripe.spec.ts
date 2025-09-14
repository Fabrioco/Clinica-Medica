import { Test, TestingModule } from '@nestjs/testing';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { JwtService } from '@nestjs/jwt';

const mockCreatePaymentIntentDto: CreatePaymentIntentDto = {
  amount: 10000,
  doctorId: 1,
  patientId: 1,
  appointmentId: 1,
};

describe('StripeController', () => {
  let controller: StripeController;
  let service: StripeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StripeController],
      providers: [
        JwtService,
        {
          provide: StripeService,
          useValue: {
            createCheckoutSession: jest
              .fn()
              .mockImplementation(async () => await Promise.resolve('url')),
          },
        },
      ],
    }).compile();

    controller = module.get<StripeController>(StripeController);
    service = module.get<StripeService>(StripeService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('deve criar uma sessão de checkout', async () => {
    const result = await controller.createCheckout(mockCreatePaymentIntentDto);

    expect(result).toEqual({ url: 'url' });
  });
});
