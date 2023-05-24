import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class BookInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        return throwError(
          () =>
            new InternalServerErrorException({
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
