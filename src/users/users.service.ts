import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { SigninDto } from './dto/signin.dto';
import { User } from './models/users.model';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './../auth/auth.service';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User')
        private readonly usersModel: Model<User>,
        private readonly authService: AuthService
    ) { }

    public async signup(signupDto: SignupDto): Promise<User> {
        const user = new this.usersModel(signupDto)
        return user.save()
    }

    public async signin(signinDto: SigninDto): Promise<{
        name: string; jwtToken: string; email: string; active: boolean
    }> {
        const user = await this.findByEmail(signinDto.email)
        const isValidPassword = await this.checkPassword(signinDto.password, user)

        if (!isValidPassword) {
            throw new NotFoundException("Invalid credentials.")
        }

        const jwtToken = await this.authService.createAccessToken(user._id)

        return {
            name: user.name,
            jwtToken,
            email: user.email,
            active: user.active
        }
    }

    public async findAll(): Promise<User[]> {
        return this.usersModel.find()
    }

    private async findByEmail(email: string): Promise<User> {
        const user = await this.usersModel.findOne({ email })

        if (!user) {
            throw new NotFoundException('Email not found.')
        }

        return user
    }

    private async checkPassword(password: string, user: User): Promise<boolean> {
        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            throw new NotFoundException('Password not found.')
        }

        return match
    }

}
