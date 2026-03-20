import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './auth.model/auth.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getSalt, hashSync } from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(UserModel.name)  
        private readonly userModel: Model<UserModel>  
    ){}

    async createUser(dto: AuthDto){

        const salt = getSalt('10')
        const newUser =  new this.userModel({
            email: dto.email,
            passwordHash: hashSync(dto.password, salt)
        })
        return newUser.save()
    }

    async findUser(email: string){
        return this.userModel.findOne({email}).exec()
    }
}