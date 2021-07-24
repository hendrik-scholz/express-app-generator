import * as chai from 'chai';
import * as chaiExclude from 'chai-exclude';
import { OpenAPI } from 'openapi-types';
import SwaggerParser from '@apidevtools/swagger-parser';

import { PostmanEnvironmentGenerator } from '../../src/generators';

import { FileReader } from '../../src/readers';

chai.use(chaiExclude.default);
const expect = chai.expect;

describe('Postman environment generator', () => {
  describe('generate', () => {
    const reader = new FileReader();

    let openApiDocumentPetStore: OpenAPI.Document;
    let openApiDocumentPetStoreWithoutServerUrl: OpenAPI.Document;

    before('load OpenAPI documents', (done) => {
    Promise.all([
      SwaggerParser.validate('test/data/petStore.yaml'),
      SwaggerParser.validate('test/data/petStoreWithoutServerUrl.yaml')
    ])
        .then((openApiDocuments) => {
          openApiDocumentPetStore = openApiDocuments[0];
          openApiDocumentPetStoreWithoutServerUrl = openApiDocuments[1];
          done();
        })
        .catch((error) => done(error));
    });

    it('should generate Postman environment JSON with given server URL', () => {
      const expectedPostmanEnvironment = reader.read(
        'test/data/expectedPostmanEnvironment.json'
      );
      const postmanEnvironmentGenerator = new PostmanEnvironmentGenerator(
        openApiDocumentPetStore,
        reader
      );
      const postmanEnvironmentContent = postmanEnvironmentGenerator.generate();

      expect(JSON.parse(postmanEnvironmentContent))
        .excluding('_postman_exported_at')
        .to.deep.equal(JSON.parse(expectedPostmanEnvironment));
    });

    it('should generate Postman environment JSON with default server URL', () => {
      const expectedPostmanEnvironmentWithDefaultServerUrl = reader.read(
        'test/data/expectedPostmanEnvironmentWithDefaultServerUrl.json'
      );
      const postmanEnvironmentGenerator = new PostmanEnvironmentGenerator(
        openApiDocumentPetStoreWithoutServerUrl,
        reader
      );
      const postmanEnvironmentContent = postmanEnvironmentGenerator.generate();

      expect(JSON.parse(postmanEnvironmentContent))
        .excluding('_postman_exported_at')
        .to.deep.equal(JSON.parse(expectedPostmanEnvironmentWithDefaultServerUrl));
    });
  });
});
