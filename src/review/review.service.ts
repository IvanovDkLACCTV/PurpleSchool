import { Injectable } from '@nestjs/common';
import { Document, Model, Types } from 'mongoose';
import { ReviewModel } from './review.model/review.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
    constructor(@InjectModel(ReviewModel.name) private readonly reviewModel: Model<ReviewModel>) {}

    async create(dto: CreateReviewDto): Promise<Document<ReviewModel>> {
        return this.reviewModel.create(dto) as unknown as Document<ReviewModel>;
    }

    async delete(id: string): Promise<Document<ReviewModel> | null> {
        return this.reviewModel.findByIdAndDelete(id).exec() as unknown as Document<ReviewModel> | null;
    }

    async findByProductId(productId: string): Promise<Document<ReviewModel>[]> {
        return this.reviewModel
            .find({ productId: new Types.ObjectId(productId) })
            .exec() as unknown as Document<ReviewModel>[];
    }
}
