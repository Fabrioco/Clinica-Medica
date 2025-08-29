import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Clinica')
    .setDescription('The Clinica API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  console.log(
    `Swagger is running on ${process.env.HOST || 'localhost'}:${process.env.PORT || '3000'}/swagger`,
  );
}
