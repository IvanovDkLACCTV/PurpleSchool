import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel, AuthSchema } from './auth.model/auth.model';

@Module({
  controllers: [AuthController],
  imports: [MongooseModule.forFeature([
    {
      name: AuthModel.name,       // вместо mongooseClass
      schema: AuthSchema,         // вместо schemaOptions
    }
  ])],
})
export class AuthModule {}