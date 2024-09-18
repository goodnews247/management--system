/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/Entity/user.entity";
import { UserService } from "src/user/user.service";
import * as dotenv from 'dotenv'
dotenv.config()
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private userService: UserService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'nwagood247',
        });
    }

    async validate(payload: {email}): Promise<User>{
        const {email} = payload;
        const user = await this.userService.findEmail(email)
        if(!user){
            throw new UnauthorizedException('Login first to access this endpoint')
        }
        return user;
    }
}