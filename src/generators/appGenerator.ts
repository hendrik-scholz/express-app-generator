import { Reader } from '../readers';
import { Content, TypeEnum } from '../types';

export class AppGenerator {
  private readonly reader: Reader;

  constructor(reader: Reader) {
    this.reader = reader;
  }

  generate(contentController: Content, contentServiceImpl: Content): Content {
    const template = this.reader.read('templates/index.txt');

    const app = template
      .replace(/#controllerName#/g, contentController.name)
      .replace(/#serviceName#/g, contentServiceImpl.name);

    return {
      name: 'index',
      type: TypeEnum.app,
      classAsString: app,
    };
  }
}
