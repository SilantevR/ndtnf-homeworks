import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentOwnerDocument = HydratedDocument<CommentOwner>;

@Schema()
export class CommentOwner {
  @Prop({ required: true })
  id: string;
  @Prop({ required: true })
  name: string;
}

export const CommentOwnerSchema = SchemaFactory.createForClass(CommentOwner);
