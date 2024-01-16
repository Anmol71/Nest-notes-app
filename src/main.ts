import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
// import * as exphbs from 'express-handlebars';

async function bootstrap() {
  // const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const viewsPath = join(__dirname, '../public/views');
  // app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }));
  // app.set('views', viewsPath);
  // app.set('view engine', '.hbs');
  // app.setViewEngine('hbs');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
