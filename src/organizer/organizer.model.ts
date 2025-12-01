import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrganizerDocument = Organizer & Document;

@Schema({ timestamps: true })
export class Organizer {
  @Prop({ default: () => new Types.ObjectId().toHexString(), unique: true })
  id: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Event' }], default: [] })
  events: Types.ObjectId[];

  @Prop()
  accessCode?: string;
}

export const OrganizerSchema = SchemaFactory.createForClass(Organizer);
