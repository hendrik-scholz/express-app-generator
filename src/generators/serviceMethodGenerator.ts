export abstract class ServiceMethodGenerator {

  private readonly defaultReturnType = 'Promise<void>';

  abstract getTemplate(): string;

  abstract getMethodBody(): string;

  getDefaultReturnType() {
    return this.defaultReturnType;
  }
}
