import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CommentOwnerSchema, CommentOwner } from './commentOwner.schema';
export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ required: true })
  bookId: string;
  @Prop({ required: true })
  comment: string;
  @Prop({ type: CommentOwnerSchema, required: true })
  user: CommentOwner;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
