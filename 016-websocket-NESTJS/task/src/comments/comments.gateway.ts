import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { WsExceptionFilter } from './ws.exception.filter';
import { UseFilters, UseInterceptors } from '@nestjs/common';
import { CommentInterceptor } from './comment.interceptor';

@UseInterceptors(CommentInterceptor)
@UseFilters(new WsExceptionFilter())
@WebSocketGateway({ cors: true })
export class CommentsGateway {
  constructor(private readonly commentsService: CommentsService) {}

  @SubscribeMessage('addComment')
  create(@MessageBody() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @SubscribeMessage('getAllComments')
  findAll(@MessageBody('id') id: 'string') {
    return this.commentsService.findAll(id);
  }

  @SubscribeMessage('findUserComments')
  findOne(@MessageBody('name') name: string) {
    return this.commentsService.findUserComments(name);
  }

  @SubscribeMessage('updateComment')
  update(@MessageBody() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(updateCommentDto);
  }

  @SubscribeMessage('removeComment')
  remove(@MessageBody('id') id: string) {
    return this.commentsService.remove(id);
  }
}
