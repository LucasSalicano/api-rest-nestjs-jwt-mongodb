import { AuthModule } from './../auth/auth.module';
import { UsersSchema } from './schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: 'User',
      schema: UsersSchema,
    }
  ]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
