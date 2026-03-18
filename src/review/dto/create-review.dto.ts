import { IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateReviewDto {
    @IsString()
    name: string;
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsNumber()
    @Min(1)
    @Max(5, {message: 'Rating must be less than or equal to 5'})
    rating: number;
    @IsString()
    productId: string;
}