import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { AuthJwtGuard } from 'src/auth/guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';

@Controller('review')
export class ReviewController {

    constructor(private readonly reviewService: ReviewService) {}

    @UsePipes(new ValidationPipe())
    @Post('create')
    async create(@Body() dto: CreateReviewDto){
        return this.reviewService.create(dto);
    }

    @UseGuards(AuthJwtGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        const deletedReview = await this.reviewService.delete(id);
        if (!deletedReview) {
            throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND); 
        }
        return deletedReview;
    }

    @UseGuards(AuthJwtGuard)
    @Get('byProduct/:productId')
    async getByProduct(@Param('productId') productId: string, @UserEmail() email: string) {
        console.log(email)
        return this.reviewService.findByProductId(productId);
    }
}
