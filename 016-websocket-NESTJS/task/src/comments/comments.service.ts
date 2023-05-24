import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schemas/comment.schema';
import { identity } from 'rxjs';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const createdComment = this.commentModel.create(createCommentDto);
    if (createdComment) {
      return createdComment;
    } else {
      throw new InternalServerErrorException({
        status: 'fail',
        description: 'Комментарий не опубликован.',
      });
    }
  }

  async findAll(id: string) {
    const comments = await this.commentModel.find({ bookId: id }).exec();
    if (comments) {
      return comments;
    } else {
      throw new InternalServerErrorException({
        status: 'fail',
        description: 'Информация не найдена.',
      });
    }
  }

  async findUserComments(name: string) {
    const comment = await this.commentModel.find({ 'user.name': name }).exec();
    if (comment) {
      return comment;
    } else {
      throw new BadRequestException({
        status: 'fail',
        description: 'Пользователь не найден.',
      });
    }
  }

  async update(updateCommentDto: UpdateCommentDto) {
    const { id, ...updateData } = updateCommentDto;
    const updatedComment = await this.commentModel
      .findByIdAndUpdate(id, updateData, {
        returnDocument: 'after',
      })
      .exec();

    if (updatedComment) {
      return updatedComment;
    } else {
      throw new InternalServerErrorException({
        status: 'fail',
        description: 'Информация не найдена.',
      });
    }
  }

  async remove(id: string) {
    const deletedComment = await this.commentModel.findByIdAndDelete(id).exec();

    if (deletedComment) {
      return deletedComment;
    } else {
      throw new InternalServerErrorException({
        status: 'fail',
        description: 'Информация не найдена.',
      });
    }
  }
}
