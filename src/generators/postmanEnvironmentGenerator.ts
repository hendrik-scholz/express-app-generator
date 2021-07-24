import { OpenAPI, OpenAPIV3 } from 'openapi-types';
import { Formatter } from '../formatter';

import { Reader } from '../readers';

export class PostmanEnvironmentGenerator {

  private readonly openApiDocument: OpenAPI.Document;

  private readonly reader: Reader;

  constructor(openApi: OpenAPI.Document, reader: Reader) {
    this.openApiDocument = openApi;
    this.reader = reader;
  }

  generate(): string {
    const postmanEnvironmentTemplate = this.reader.read('templates/test/postmanEnvironment.txt');

    const doc = (<OpenAPIV3.Document>this.openApiDocument);
    const name = doc.info.title;
    const serverObject = (<OpenAPIV3.ServerObject[]>doc.servers);
    const serverUrl = serverObject?.[0]?.url ? serverObject[0].url : 'http://127.0.0.1';

    const postmanProject = postmanEnvironmentTemplate
      .replace('#name#', name)
      .replace('#serverUrl#', serverUrl)
      .replace('#exportedAt#', new Date().toISOString());

    return Formatter.formatJavaScript(postmanProject);
  }
}
