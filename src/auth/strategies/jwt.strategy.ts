import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserModel } from "../auth.model/auth.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly congigService: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: congigService.get('JWT_SECRET') ?? ''
        })
    }

    async validate({email}: Pick<UserModel, 'email'>){
        return email
    }
}