import { SetMetadata } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

export const Public = () => {
  return SetMetadata(process.env.IS_PUBLIC_KEY, true);
};
