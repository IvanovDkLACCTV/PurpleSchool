import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'Review', timestamps: true })
export class ReviewModel extends Document {
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);