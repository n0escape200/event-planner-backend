import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './admin.model';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<AdminDocument>) {}

  async create(data: any) {
    const created = new this.adminModel(data);
    return created.save();
  }

  async findAll() {
    return this.adminModel.find().exec();
  }

  async findOne(id: string) {
    const found = await this.adminModel.findOne({ id }).exec();
    if (!found) throw new NotFoundException('Admin not found');
    return found;
  }

  async update(id: string, update: any) {
    const updated = await this.adminModel.findOneAndUpdate({ id }, update, { new: true }).exec();
    if (!updated) throw new NotFoundException('Admin not found');
    return updated;
  }

  async remove(id: string) {
    const res = await this.adminModel.findOneAndDelete({ id }).exec();
    if (!res) throw new NotFoundException('Admin not found');
    return { deleted: true };
  }
}
