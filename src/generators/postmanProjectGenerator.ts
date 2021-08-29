import { OpenAPI } from 'openapi-types';
import { Formatter } from '../formatter';

import { Reader } from '../readers';

export class PostmanProjectGenerator {

  private readonly openApiDocument: OpenAPI.Document;

  private readonly reader: Reader;

  constructor(openApi: OpenAPI.Document, reader: Reader) {
    this.openApiDocument = openApi;
    this.reader = reader;
  }

  generate(): string {
    const postmanProjectItemTemplate = this.reader.read('templates/test/postmanProjectItem.txt');
    const postmanProjectTemplate = this.reader.read('templates/test/postmanProject.txt');

    const items: string[] = [];

    Object.keys(this.openApiDocument.paths).forEach(path => {

      const expressPath = path.replace(/{/g, '{{').replace(/}/g, '}}');

      if (this.openApiDocument.paths[path]?.get) {
        items.push(postmanProjectItemTemplate
          .replace('#httpMethod#', 'GET')
          .replace(/#endpoint#/g, expressPath),
        );
      }

      if (this.openApiDocument.paths[path]?.post) {
        items.push(postmanProjectItemTemplate
          .replace('#httpMethod#', 'POST')
          .replace(/#endpoint#/g, expressPath),
        );
      }

      if (this.openApiDocument.paths[path]?.put) {
        items.push(postmanProjectItemTemplate
          .replace('#httpMethod#', 'PUT')
          .replace(/#endpoint#/g, expressPath),
        );
      }

      if (this.openApiDocument.paths[path]?.patch) {
        items.push(postmanProjectItemTemplate
          .replace('#httpMethod#', 'PATCH')
          .replace(/#endpoint#/g, expressPath),
        );
      }

      if (this.openApiDocument.paths[path]?.delete) {
        items.push(postmanProjectItemTemplate
          .replace('#httpMethod#', 'DELETE')
          .replace(/#endpoint#/g, expressPath),
        );
      }

      if (this.openApiDocument.paths[path]?.options) {
        items.push(postmanProjectItemTemplate
          .replace('#httpMethod#', 'OPTIONS')
          .replace(/#endpoint#/g, expressPath),
        );
      }

      if (this.openApiDocument.paths[path]?.head) {
        items.push(postmanProjectItemTemplate
          .replace('#httpMethod#', 'HEAD')
          .replace(/#endpoint#/g, expressPath),
        );
      }
    });

    const collectionName = this.openApiDocument.info.title;

    const postmanProject = postmanProjectTemplate
      .replace('#collectionName#', collectionName)
      .replace('#items#', items.join(','));

    return Formatter.formatJavaScript(postmanProject);
  }
}

