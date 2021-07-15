import * as fs from 'fs';
import { TypeEnum } from '../types';

import { Content } from '../types/content';
import { Writer } from './writer';

export class FileWriter implements Writer {
  private readonly outputDirectory: string;

  constructor(outputDirectory: string) {
    this.outputDirectory = outputDirectory;
  }

  write(content: Content): void {
    let outputDirectoryForContentType;

    if (content.type === TypeEnum.app) {
      outputDirectoryForContentType = `${this.outputDirectory}`;

      if(!fs.existsSync(this.outputDirectory)) {
        fs.mkdirSync(this.outputDirectory, { recursive: true });
      }
    } else {
      outputDirectoryForContentType = `${this.outputDirectory}/${content.type}s`;

      if(!fs.existsSync(outputDirectoryForContentType)) {
        fs.mkdirSync(outputDirectoryForContentType, { recursive: true });
      }
    }

    fs.writeFileSync(`${outputDirectoryForContentType}/${content.name}.ts`, content.classAsString);
  }

  // TODO: add to interface
  writeStringToFile(content: string, filename: string): void {
    fs.writeFileSync(`${this.outputDirectory}/${filename}`, content);
  }
}
