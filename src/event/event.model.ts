import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  @Prop({ default: () => new Types.ObjectId().toHexString(), unique: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop()
  eventType?: string;

  @Prop()
  capacity?: number;

  @Prop()
  ticketPrice?: number;

  @Prop()
  startDate?: Date;

  @Prop()
  endDate?: Date;

  @Prop()
  startTime?: Date;

  @Prop()
  endTime?: Date;

  @Prop()
  format?: string;

  @Prop()
  venueName?: string;

  @Prop()
  address?: string;

  @Prop({ type: [String], default: [] })
  photos: string[];

  @Prop({ type: [String], default: [] })
  files: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  registeredUsers: Types.ObjectId[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
