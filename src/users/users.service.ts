import { ConflictException, Injectable } from '@nestjs/common';
import { UserDocument, Users } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UserDocument>,
  ) {}
  async createUser(username: string, email: string, password: string) {
    const user = await this.usersModel.find({ email });
    const salt  = await bcrypt.genSalt(10)
     password = await bcrypt.hash(password,salt)
    if (user.length) {
      throw new ConflictException('User already exists!');
    }
    const uniqueUser = new this.usersModel({ username, email, password });
    return uniqueUser.save();
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.usersModel.findOne({ email });
  }
}
