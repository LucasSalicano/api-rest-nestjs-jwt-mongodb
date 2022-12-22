import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersSchema } from '../users/schemas/users.schema';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UsersSchema,
      }
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})

export class AuthModule { }
