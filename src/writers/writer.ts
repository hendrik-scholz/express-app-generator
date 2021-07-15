import { Content } from '../types';

export interface Writer {
  write(content: Content): void;
}
