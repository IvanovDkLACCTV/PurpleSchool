import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

@Schema()
export class HhData {
  @Prop()
  count: number;

  @Prop()
  juniorSalary: number;

  @Prop()
  middleSalary: number;

  @Prop()
  seniorSalary: number;
}

export const HhDataSchema = SchemaFactory.createForClass(HhData);

@Schema()
export class Advantage {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const AdvantageSchema = SchemaFactory.createForClass(Advantage);

@Schema({ collection: 'TopPage', timestamps: true })
export class TopPageModel extends Document {
  @Prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @Prop()
  secondCategory: string;

  @Prop()
  title: string;

  @Prop()
  category: string;

  @Prop({ type: HhDataSchema, required: false })
  hh?: HhData;

  @Prop({ type: [AdvantageSchema] })
  advantages: Advantage[];

  @Prop()
  seoText: string;

  @Prop()
  tagsTitle: string;

  @Prop({ type: [String] })
  tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);