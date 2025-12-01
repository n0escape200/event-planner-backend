import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class User {
	@Prop({ default: () => new Types.ObjectId().toHexString(), unique: true })
	id: string;

	@Prop({ required: true })
	firstName: string;

	@Prop({ required: true })
	lastName: string;

	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop({ default: () => new Date() })
	createdAt: Date;

	@Prop()
	deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
