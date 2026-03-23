import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { AuthDto } from 'src/auth/dto/auth.dto';


const loginDto: AuthDto = {
	email: "test@mail.com",
	password: "123456"
}


describe('AuthController (e2e)', () => {
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

    
  });

  it('/auth/login (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body}: request.Response) => {
        
        expect(body.access_token).toBeDefined()
      })
      .catch((err) => {
        throw err;
      });
  });



  it('/auth/login (POST) - fail password', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({...loginDto, password: 'wrongpassword'})
      .expect(401, {
        message: "Wrong password",
        error: "Unauthorized",
        statusCode: 401
    })
      
  });


  it('/auth/login (POST) - fail password', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({...loginDto, email: 'wrongmail@mail.com'})
      .expect(401, {
        message: "User is not found",
        error: "Unauthorized",
        statusCode: 401
    })
      
  });


  afterAll(async () => {
    await app.close();
});
}); 
