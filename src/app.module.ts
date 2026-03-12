import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ReviewModule } from './review/review.module';
import { ProductModule } from './product/product.module';
import { configDotenv } from 'dotenv';

configDotenv();

@Module({
  imports: [AuthModule, TopPageModule, ReviewModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
