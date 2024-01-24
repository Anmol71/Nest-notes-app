import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as methodOverride from 'method-override';
import bodyParser from 'body-parser';
import { NextFunction, Request, Response } from 'express';
// import * as exphbs from 'express-handlebars';

async function bootstrap() {
  // const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // const viewsPath = join(__dirname, '../public/views');
  // app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }));
  // app.set('views', viewsPath);
  // app.set('view engine', '.hbs');
  // app.setViewEngine('hbs');

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  // app.use(bodyParser.urlencoded());
  // app.use(
  //   methodOverride(function (req , ,next) {
  //     if (req.body && typeof req.body === 'object' && '_method' in req.body) {
  //       // look in urlencoded POST bodies and delete it
  //       const method = req.body._method;
  //       console.log(method, req.body._method);

  //       console.log(req.method,"jme");
  //       delete req.body._method;

  //     }
  //   }),
  // );

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('log!!!!!');
    console.log(req.method, 'method');
    req.method = req.body._method;

    console.log(req, "bodxy")
    next();
  });

  const config = new DocumentBuilder()
    .setTitle('API Testing')
    .setDescription('The API testing description')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
