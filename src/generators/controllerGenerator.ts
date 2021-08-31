import { Formatter } from '../formatter';
import { Reader } from '../readers';
import { Content, Method, TypeEnum } from '../types';

export class ControllerGenerator {

  private readonly defaultHttpStatusCode = 204;

  private readonly controllerFunctionParameters = '(req: Request, res: Response)';

  private readonly controllerName: string;

  private readonly methods: Method[];

  private readonly reader: Reader;

  constructor(controllerName: string, methods: Method[], reader: Reader) {
    this.controllerName = controllerName;
    this.methods = methods;
    this.reader = reader;
  }

  generate(): Content {
    const template = this.reader.read('templates/controllers/controller.txt');
    const endpoints: string[] = [];

    this.methods.forEach((method) => {
      const expressPath = method.path.replace(/{/g, ':').replace(/}/g, '');
      endpoints.push(`app.${method.operation}('${expressPath}', ${this.controllerFunctionParameters} =>
        service.${method.methodName}()
          .then((data: any) => res.sendStatus(${this.defaultHttpStatusCode}))
          .catch((error: any) => res.sendStatus(500)));`);
    });

    const controller = template
      .replace(/#name#/g, this.controllerName)
      .replace('#methods#', endpoints.join('\n\n'));

    return {
      name: `${this.controllerName}Controller`,
      type: TypeEnum.controller,
      classAsString: Formatter.formatJavaScript(controller),
    };
  }
}
