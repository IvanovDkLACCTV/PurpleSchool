import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ReviewModule } from './review/review.module';
import { ProductModule } from './product/product.module';
import { configDotenv } from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongo.config';

configDotenv();

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: getMongoConfig,
    inject: [ConfigService],
  }), AuthModule, TopPageModule, ReviewModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 