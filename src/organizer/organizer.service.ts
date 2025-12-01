import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organizer, OrganizerDocument } from './organizer.model';

@Injectable()
export class OrganizerService {
  constructor(@InjectModel(Organizer.name) private organizerModel: Model<OrganizerDocument>) {}

  async create(data: any) {
    const created = new this.organizerModel(data);
    return created.save();
  }

  async findAll() {
    return this.organizerModel.find().exec();
  }

  async findOne(id: string) {
    const found = await this.organizerModel.findOne({ id }).exec();
    if (!found) throw new NotFoundException('Organizer not found');
    return found;
  }

  async update(id: string, update: any) {
    const updated = await this.organizerModel.findOneAndUpdate({ id }, update, { new: true }).exec();
    if (!updated) throw new NotFoundException('Organizer not found');
    return updated;
  }

  async remove(id: string) {
    const res = await this.organizerModel.findOneAndDelete({ id }).exec();
    if (!res) throw new NotFoundException('Organizer not found');
    return { deleted: true };
  }
}
