import { ServiceMethodGenerator } from './serviceMethodGenerator';

export class NoMethodBodyGenerator extends ServiceMethodGenerator {

  private readonly methodBody = ';';

  getTemplate(): string {
    return 'templates/services/service.txt';
  }

  getMethodBody(): string {
    return this.methodBody;
  }
}
