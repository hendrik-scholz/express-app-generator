import { MethodOperationEnum } from './methodOperationEnum';

export interface Method {
  path: string;
  operation: MethodOperationEnum;
  methodName: string;
}
