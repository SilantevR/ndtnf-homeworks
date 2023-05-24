import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class BookPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(`pipe value: ${Object.keys(value)}`);

    return value;
  }
}
