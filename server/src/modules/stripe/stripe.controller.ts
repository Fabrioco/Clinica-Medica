import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StripeService } from './stripe.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { AuthGuard } from 'src/commons/guards/auth.guard';

@Controller('Stripe')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('checkout')
  @ApiOperation({ summary: 'Cria uma sessão de checkout' })
  @ApiBody({
    description: 'Valor do pagamento em centavos',
    type: CreatePaymentIntentDto,
  })
  async createCheckout(@Body() data: CreatePaymentIntentDto) {
    const url = await this.stripeService.createCheckoutSession(data);
    return { url };
  }
}
