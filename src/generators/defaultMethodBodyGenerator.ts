import { ServiceMethodGenerator } from './serviceMethodGenerator';

export class DefaultMethodBodyGenerator extends ServiceMethodGenerator {

  private readonly methodBody = '{ return new Promise((resolve, reject) => resolve()); }';

  getTemplate(): string {
    return 'templates/services/serviceImpl.txt';
  }

  getMethodBody(): string {
    return this.methodBody;
  }
}
