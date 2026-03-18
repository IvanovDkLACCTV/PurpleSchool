import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { Types } from 'mongoose';

const productId = new Types.ObjectId().toHexString();


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

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    await app.init();
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

  afterAll(async () => {
    await app.close();
});
}); 
