import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema({ timestamps: true })
export class Admin {
  @Prop({ default: () => new Types.ObjectId().toHexString(), unique: true })
  id: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId; // reference to User._id

  @Prop({ default: () => new Date() })
  createdAt: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
