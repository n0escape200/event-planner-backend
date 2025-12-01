import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './event.model';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}

  async create(data: any) {
    const created = new this.eventModel(data);
    return created.save();
  }

  async findAll() {
    return this.eventModel.find().exec();
  }

  async findOne(id: string) {
    const found = await this.eventModel.findOne({ id }).exec();
    if (!found) throw new NotFoundException('Event not found');
    return found;
  }

  async update(id: string, update: any) {
    const updated = await this.eventModel.findOneAndUpdate({ id }, update, { new: true }).exec();
    if (!updated) throw new NotFoundException('Event not found');
    return updated;
  }

  async remove(id: string) {
    const res = await this.eventModel.findOneAndDelete({ id }).exec();
    if (!res) throw new NotFoundException('Event not found');
    return { deleted: true };
  }
}
