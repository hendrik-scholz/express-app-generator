import * as chai from 'chai';
import * as chaiExclude from 'chai-exclude';
import { OpenAPI } from 'openapi-types';
import SwaggerParser from '@apidevtools/swagger-parser';

import { FileReader } from '../../src/readers';
import { PostmanProjectGenerator } from '../../src/generators/postmanProjectGenerator';

chai.use(chaiExclude.default);
const expect = chai.expect;

describe('Postman project generator', () => {
  describe('generate', () => {
    const reader = new FileReader();

    let openApiDocumentHttpGet: OpenAPI.Document;
    let openApiDocumentHttpPost: OpenAPI.Document;
    let openApiDocumentHttpPut: OpenAPI.Document;
    let openApiDocumentHttpPatch: OpenAPI.Document;
    let openApiDocumentHttpDelete: OpenAPI.Document;
    let openApiDocumentHttpOptions: OpenAPI.Document;
    let openApiDocumentHttpHead: OpenAPI.Document;
    let openApiDocumentPetStore: OpenAPI.Document;

    before('load OpenAPI documents', (done) => {
      Promise.all([
        SwaggerParser.validate("test/data/openApiDocumentHttpGet.yaml"),
        SwaggerParser.validate("test/data/openApiDocumentHttpPost.yaml"),
        SwaggerParser.validate("test/data/openApiDocumentHttpPut.yaml"),
        SwaggerParser.validate("test/data/openApiDocumentHttpPatch.yaml"),
        SwaggerParser.validate("test/data/openApiDocumentHttpDelete.yaml"),
        SwaggerParser.validate("test/data/openApiDocumentHttpOptions.yaml"),
        SwaggerParser.validate("test/data/openApiDocumentHttpHead.yaml"),
        SwaggerParser.validate("test/data/petStore.yaml"),
      ])
        .then((openApiDocuments) => {
          openApiDocumentHttpGet = openApiDocuments[0];
          openApiDocumentHttpPost = openApiDocuments[1];
          openApiDocumentHttpPut = openApiDocuments[2];
          openApiDocumentHttpPatch = openApiDocuments[3];
          openApiDocumentHttpDelete = openApiDocuments[4];
          openApiDocumentHttpOptions = openApiDocuments[5];
          openApiDocumentHttpHead = openApiDocuments[6];
          openApiDocumentPetStore = openApiDocuments[7];
          done();
        })
        .catch((error) => done(error));
    });

    it('should generate Postman project JSON for HTTP request method GET', () => {
      const expectedPostmanProjectHttpGet = reader.read(
        'test/data/expectedPostmanProjectHttpGet.json'
      );
      const postmanProjectGenerator = new PostmanProjectGenerator(
        openApiDocumentHttpGet,
        reader
      );
      const postmanProjectContent = postmanProjectGenerator.generate();

      expect(JSON.parse(postmanProjectContent)).to.deep.equal(
        JSON.parse(expectedPostmanProjectHttpGet)
      );
    });

    it('should generate Postman project JSON for HTTP request method POST', () => {
      const expectedPostmanProjectHttpPost = reader.read(
        'test/data/expectedPostmanProjectHttpPost.json'
      );
      const postmanProjectGenerator = new PostmanProjectGenerator(
        openApiDocumentHttpPost,
        reader
      );
      const postmanProjectContent = postmanProjectGenerator.generate();

      expect(JSON.parse(postmanProjectContent)).to.deep.equal(
        JSON.parse(expectedPostmanProjectHttpPost)
      );
    });

    it('should generate Postman project JSON for HTTP request method PUT', () => {
      const expectedPostmanProjectHttpPut = reader.read(
        'test/data/expectedPostmanProjectHttpPut.json'
      );
      const postmanProjectGenerator = new PostmanProjectGenerator(
        openApiDocumentHttpPut,
        reader
      );
      const postmanProjectContent = postmanProjectGenerator.generate();

      expect(JSON.parse(postmanProjectContent)).to.deep.equal(
        JSON.parse(expectedPostmanProjectHttpPut)
      );
    });

    it('should generate Postman project JSON for HTTP request method PATCH', () => {
      const expectedPostmanProjectHttpPatch = reader.read(
        'test/data/expectedPostmanProjectHttpPatch.json'
      );
      const postmanProjectGenerator = new PostmanProjectGenerator(
        openApiDocumentHttpPatch,
        reader
      );
      const postmanProjectContent = postmanProjectGenerator.generate();

      expect(JSON.parse(postmanProjectContent)).to.deep.equal(
        JSON.parse(expectedPostmanProjectHttpPatch)
      );
    });

    it('should generate Postman project JSON for HTTP request method DELETE', () => {
      const expectedPostmanProjectHttpDelete = reader.read(
        'test/data/expectedPostmanProjectHttpDelete.json'
      );
      const postmanProjectGenerator = new PostmanProjectGenerator(
        openApiDocumentHttpDelete,
        reader
      );
      const postmanProjectContent = postmanProjectGenerator.generate();

      expect(JSON.parse(postmanProjectContent)).to.deep.equal(
        JSON.parse(expectedPostmanProjectHttpDelete)
      );
    });

    it('should generate Postman project JSON for HTTP request method OPTIONS', () => {
      const expectedPostmanProjectHttpOptions = reader.read(
        'test/data/expectedPostmanProjectHttpOptions.json'
      );
      const postmanProjectGenerator = new PostmanProjectGenerator(
        openApiDocumentHttpOptions,
        reader
      );
      const postmanProjectContent = postmanProjectGenerator.generate();

      expect(JSON.parse(postmanProjectContent)).to.deep.equal(
        JSON.parse(expectedPostmanProjectHttpOptions)
      );
    });

    it('should generate Postman project JSON for HTTP request method HEAD', () => {
      const expectedPostmanProjectHttpHead = reader.read(
        'test/data/expectedPostmanProjectHttpHead.json'
      );
      const postmanProjectGenerator = new PostmanProjectGenerator(
        openApiDocumentHttpHead,
        reader
      );
      const postmanProjectContent = postmanProjectGenerator.generate();

      expect(JSON.parse(postmanProjectContent)).to.deep.equal(
        JSON.parse(expectedPostmanProjectHttpHead)
      );
    });

    it('should generate Postman project JSON for the pet store example', () => {
      const expectedPostmanProject = reader.read(
        'test/data/expectedPostmanProject.json'
      );
      const postmanProjectGenerator = new PostmanProjectGenerator(
        openApiDocumentPetStore,
        reader
      );
      const postmanProjectContent = postmanProjectGenerator.generate();

      expect(JSON.parse(postmanProjectContent)).to.deep.equal(
        JSON.parse(expectedPostmanProject)
      );
    });
  });
});
