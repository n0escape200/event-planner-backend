import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './student.model';

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) {}

  async create(data: any) {
    const created = new this.studentModel(data);
    return created.save();
  }

  async findAll() {
    return this.studentModel.find().exec();
  }

  async findOne(id: string) {
    const found = await this.studentModel.findOne({ id }).exec();
    if (!found) throw new NotFoundException('Student not found');
    return found;
  }

  async update(id: string, update: any) {
    const updated = await this.studentModel.findOneAndUpdate({ id }, update, { new: true }).exec();
    if (!updated) throw new NotFoundException('Student not found');
    return updated;
  }

  async remove(id: string) {
    const res = await this.studentModel.findOneAndDelete({ id }).exec();
    if (!res) throw new NotFoundException('Student not found');
    return { deleted: true };
  }
}
