import { OpenAPI, OpenAPIV3 } from 'openapi-types';
import { Formatter } from '../formatter';
import { OpenApiToTsTypesMapper } from '../mappers';

import { Reader } from '../readers';
import { Content, TypeEnum } from '../types';

export class TypesGenerator {

  private readonly openApiDocument: OpenAPI.Document;

  private readonly reader: Reader;

  constructor(openApi: OpenAPI.Document, reader: Reader) {
    this.openApiDocument = openApi;
    this.reader = reader;
  }

  generate(): Content[] {
    const types = new Array<Content>();
    const doc = (<OpenAPIV3.Document>this.openApiDocument);
    const template = this.reader.read('templates/types/type.txt');

    if (doc.components?.schemas) {
      Object.keys(doc.components?.schemas)
        .forEach(schema => {
          const properties = ((<OpenAPIV3.SchemaObject>(<OpenAPIV3.Document>this.openApiDocument).components?.schemas?.[schema]).properties);

          const propertiesPerType: string[] = [];

          if (properties) {
            Object.keys(properties).forEach(property => {
              const openApiType = (<OpenAPIV3.SchemaObject>(properties[property])).type;

              if (openApiType) {
                const tsType = OpenApiToTsTypesMapper.getTsTypeForOpenApiType(openApiType);
                propertiesPerType.push(`${property}: ${tsType};`);
              } else {
                propertiesPerType.push(`${property}: any;`);
              }
            });
          }

          const name = `${schema.substring(0, 1).toLocaleUpperCase()}${schema.substring(1)}`;

          const type = template
            .replace('#name#', name)
            .replace('#types#', propertiesPerType.join('\n'));

          const content: Content = {
            name,
            type: TypeEnum.type,
            classAsString: Formatter.formatJavaScript(type),
          };

          types.push(content);
        });
    }

    return types;
  }
}
