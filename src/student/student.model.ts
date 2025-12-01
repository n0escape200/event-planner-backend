import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema({ timestamps: true })
export class Student {
  @Prop({ default: () => new Types.ObjectId().toHexString(), unique: true })
  id: string;

  @Prop({ required: true })
  user: Types.ObjectId; // references User._id

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Event' }], default: [] })
  saved: Types.ObjectId[]; // array of Event ids

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Event' }], default: [] })
  registered: Types.ObjectId[]; // array of Event ids
}

export const StudentSchema = SchemaFactory.createForClass(Student);
