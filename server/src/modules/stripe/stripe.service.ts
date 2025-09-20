import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import Stripe from 'stripe';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private readonly prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2025-08-27.basil',
    });
  }

  async createCheckoutSession(data: CreatePaymentIntentDto) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new BadRequestException(
        'STRIPE_SECRET_KEY environment variable is not set',
      );
    }

    const YOUR_DOMAIN = 'http://localhost:3838'; // onde o usuário será redirecionado

    if (
      !data.amount ||
      !data.patientId ||
      !data.doctorId ||
      !data.appointmentId
    ) {
      throw new BadRequestException('Dado(s) obrigatório(s) não informado(s)');
    }

    const doctor = await this.prisma.doctor.findUnique({
      where: { id: data.doctorId },
    });

    if (!doctor) {
      throw new NotFoundException('Doutor não encontrado');
    }

    const patient = await this.prisma.patient.findUnique({
      where: { id: data.patientId },
    });

    if (!patient) {
      throw new NotFoundException('Paciente não encontrado');
    }

    const appointment = await this.prisma.appointment.findUnique({
      where: { id: data.appointmentId },
    });

    if (!appointment) {
      throw new NotFoundException('Consulta não encontrada');
    }

    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: { name: 'Pagamento' },
            unit_amount: data.amount * 100, // centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      metadata: {
        doctorId: String(data.doctorId),
        patientId: String(data.patientId),
        appointmentId: String(data.appointmentId),
      },
    });

    return session.url;
  }
}
