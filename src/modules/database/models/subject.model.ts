import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { ObjectId } from '../../../helpers/types/objectid.type';
import { CollectionName } from '../../../helpers/enums/collection-names.enum';

@Schema({
  collection: CollectionName.Subject,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})

export class Subject {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  time: string; 

  @Prop({ default: 0 })
  class_room: string; 

  @Prop({ default: false })
  is_deleted: boolean;

}

export type SubjectDocument = Subject & mongoose.Document;

export const SubjectSchema = SchemaFactory.createForClass(Subject);
