import { OpenAPIV2, OpenAPIV3 } from "openapi-types";
import { Method } from "../types";
import { MethodOperationEnum } from "../types/methodOperationEnum";

export class MethodService {

  getMethodNamesForPaths(pathsObject: OpenAPIV2.PathsObject | OpenAPIV3.PathsObject): Method[] {
    const methodNames: Method[] = [];
    Object.keys(pathsObject).forEach((path) => {
      const pathObject = pathsObject[path];

      if (pathObject?.get) {
        methodNames.push({
          path,
          operation: MethodOperationEnum.get,
          methodName: this.getNameForOperation(pathObject?.get, path, MethodOperationEnum.get)
        });
      }

      if (pathObject?.post) {
        methodNames.push({
          path,
          operation: MethodOperationEnum.post,
          methodName: this.getNameForOperation(pathObject?.post, path, MethodOperationEnum.post)
        });
      }

      if (pathObject?.put) {
        methodNames.push({
          path,
          operation: MethodOperationEnum.put,
          methodName: this.getNameForOperation(pathObject?.put, path, MethodOperationEnum.put)
        });
      }

      if (pathObject?.patch) {
        methodNames.push({
          path,
          operation: MethodOperationEnum.patch,
          methodName: this.getNameForOperation(pathObject?.patch, path, MethodOperationEnum.patch)
        });
      }

      if (pathObject?.delete) {
        methodNames.push({
          path,
          operation: MethodOperationEnum.delete,
          methodName: this.getNameForOperation(pathObject?.delete, path, MethodOperationEnum.delete)
        });
      }

      if (pathObject?.options) {
        methodNames.push({
          path,
          operation: MethodOperationEnum.options,
          methodName: this.getNameForOperation(pathObject?.options, path, MethodOperationEnum.options)
        });
      }

      if (pathObject?.head) {
        methodNames.push({
          path,
          operation: MethodOperationEnum.head,
          methodName: this.getNameForOperation(pathObject?.head, path, MethodOperationEnum.head)
        });
      }
    });

    if (methodNames.length > 0) {
      return methodNames;
    } else {
      return [{
        path: '/',
        operation: MethodOperationEnum.default,
        methodName: 'default'
      }];
    }
  }

  private getNameForOperation(operationObject: OpenAPIV2.OperationObject | OpenAPIV3.OperationObject, path: string, operation: string): string {
    let methodName = 'default';

    if (operationObject) {
      if (operationObject.operationId) {
        methodName = `${operationObject.operationId}`;
      } else {
        methodName = this.getMethodNameForPathAndHttpRequestMethod(`${path}`, operation);
      }
    }

    return methodName;
  }

  private getMethodNameForPathAndHttpRequestMethod(path: string, httpRequestMethod: string): string {
    const name = path.split('/')
      .map(pathSection => {
        if (pathSection.charAt(0) !== '{') {
          return `${pathSection.charAt(0).toUpperCase()}${pathSection.substr(1)}`;
        } else {
          return `${pathSection.charAt(1).toUpperCase()}${pathSection.substr(2, pathSection.indexOf('}') - 2)}`;
        }
      })
      .filter(newCaseStr => newCaseStr.length > 0)
      .join('');

      return `${httpRequestMethod}${name}`;
  }
}
