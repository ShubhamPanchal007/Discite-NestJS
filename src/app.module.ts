import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(
      `mongodb+srv://Shubham:${process.env.DB_PASS_KEY}@cluster0.lbavol5.mongodb.net/?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [AppController],
})
export class AppModule {}
