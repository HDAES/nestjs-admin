import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger/dist';

export default class Swagger {
  constructor(app) {
    const config = new DocumentBuilder()
      .setTitle('this is a title')
      .setDescription('this is a description')
      .setVersion('1.0.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc-docs', app, document);
  }
}