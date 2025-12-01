import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async create(data: any) {
		if (!data.password) {
			throw new Error('Password is required');
		}
		const hashed = await bcrypt.hash(data.password, 10);
		const created = new this.userModel({ ...data, password: hashed });
		return created.save();
	}

	async findAll() {
		return this.userModel.find().exec();
	}

	async findOne(id: string) {
		const found = await this.userModel.findOne({ id }).exec();
		if (!found) throw new NotFoundException('User not found');
		return found;
	}

	async update(id: string, update: any) {
		if (update.password) {
			update.password = await bcrypt.hash(update.password, 10);
		}
		const updated = await this.userModel.findOneAndUpdate({ id }, update, { new: true }).exec();
		if (!updated) throw new NotFoundException('User not found');
		return updated;
	}

	async remove(id: string) {
		const res = await this.userModel.findOneAndDelete({ id }).exec();
		if (!res) throw new NotFoundException('User not found');
		return { deleted: true };
	}
}
