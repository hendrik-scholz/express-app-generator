import { Reader } from '../readers';
import { Content, TypeEnum } from '../types';

export class BarrelGenerator {

  private readonly reader: Reader;

  constructor(reader: Reader) {
    this.reader = reader;
  }

  generate(content: Content): Content {
    if (content.type === TypeEnum.controller) {
      const template = this.reader.read('templates/controllers/index.txt');

      const barrel = template.replace(/#name#/g, content.name);

      return {
        name: 'index',
        type: TypeEnum.controller,
        classAsString: barrel,
      };
    }

    if (content.type === TypeEnum.service) {
      const template = this.reader.read('templates/services/index.txt');

      const barrel = template.replace(/#name#/g, content.name);

      return {
        name: 'index',
        type: TypeEnum.service,
        classAsString: barrel,
      };
    }

    if (content.type === TypeEnum.type) {
      const template = this.reader.read('templates/types/index.txt');

      const barrel = template.replace(/#name#/g, content.name);

      return {
        name: 'index',
        type: TypeEnum.type,
        classAsString: barrel,
      };
    }

    return {
      name: 'index',
      type: TypeEnum.barrel,
      classAsString: '// default\n',
    };
  }
}
