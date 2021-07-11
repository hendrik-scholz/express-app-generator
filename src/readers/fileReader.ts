import * as fs from 'fs';

import { Reader } from './reader';

export class FileReader implements Reader {
  public read(source: string): string {
    return fs.readFileSync(source, { encoding: 'utf-8' });
  }
}
