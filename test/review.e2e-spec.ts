import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { Types } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';

const productId = new Types.ObjectId().toHexString();

const loginDto: AuthDto = {
	email: "test@mail.com",
	password: "123456"
}

const testDto: CreateReviewDto = {
  name: 'Test',
  title: 'Test',
  description: 'Test',
  rating: 5,
  productId
}

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let createdId: string;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    await app.init();

    const {body} = await request(app.getHttpServer()).post('/auth/login').send(loginDto)
    token = body.access_token
  });

  it('/review/create (POST)', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(201)
      .then(({ body}: request.Response) => {
        createdId = body._id
        expect(createdId).toBeDefined()
      })
      .catch((err) => {
        throw err;
      });
  });

  it('/review/create (POST) validation error', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send({...testDto, rating: 6})
      .expect(400)
      .then(({ body }: request.Response) => {
        console.log(body);
        expect(body.statusCode).toBe(400);
    });
  });

  it('/review/:id (DELETE) - success', async () => {
    return request(app.getHttpServer())
    .delete('/review/' + createdId)
    .set('Authorization', 'Bearer ' + token)
    .expect(200)
  })

  afterAll(async () => {
    await app.close();
});
}); 
