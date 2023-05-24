import { WsException } from '@nestjs/websockets';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class CommentInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        return throwError(
          () =>
            new WsException({
              status: 'fail',
              data: err,
            }),
        );
      }),
      map((data) => {
        return {
          status: 'success',
          data: data,
        };
      }),
    );
  }
}
