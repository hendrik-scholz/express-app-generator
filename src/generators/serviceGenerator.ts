import { Formatter } from '../formatter';
import { Reader } from '../readers';
import { Content, Method, TypeEnum } from '../types';
import { ServiceMethodGenerator } from './serviceMethodGenerator';

export class ServiceGenerator {

  private readonly serviceName: string;

  private readonly methods: Method[];

  private readonly reader: Reader;

  private readonly serviceMethodGenerator: ServiceMethodGenerator;

  constructor(serviceName: string, methods: Method[], reader: Reader, serviceMethodGenerator: ServiceMethodGenerator) {
    this.serviceName = serviceName;
    this.methods = methods;
    this.reader = reader;
    this.serviceMethodGenerator = serviceMethodGenerator;
  }

  generate(): Content {
    const template = this.reader.read(this.serviceMethodGenerator.getTemplate());
    const methodsAsString: string[] = [];
    const defaultBody = this.serviceMethodGenerator.getMethodBody();
    const defaultReturnType = this.serviceMethodGenerator.getDefaultReturnType();

    this.methods.forEach(method => {
        methodsAsString.push(`${method.methodName}(): ${defaultReturnType} ${defaultBody}`);
    });

    const service = template
      .replace(/#name#/g, this.serviceName)
      .replace('#methods#', methodsAsString.join('\n\n'));

    return {
      name: `${this.serviceName}Service`,
      type: TypeEnum.service,
      classAsString: Formatter.formatJavaScript(service),
    };
  }
}
