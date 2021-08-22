import { OpenAPI } from "openapi-types";
import SwaggerParser from '@apidevtools/swagger-parser';
import { expect } from 'chai';
import { MethodService } from '../../src/service';

describe('Method service', () => {
  describe('getMethodNamesForPaths', () => {
    const methodService: MethodService = new MethodService();

    let openApiDocumentHttpGet: OpenAPI.Document;
    let openApiDocumentHttpPost: OpenAPI.Document;
    let openApiDocumentHttpPut: OpenAPI.Document;
    let openApiDocumentHttpPatch: OpenAPI.Document;
    let openApiDocumentHttpDelete: OpenAPI.Document;
    let openApiDocumentHttpOptions: OpenAPI.Document;
    let openApiDocumentHttpHead: OpenAPI.Document;
    let openApiDocumentPetStore: OpenAPI.Document;
    let openApiDocumentHttpGetWithoutOperationId: OpenAPI.Document;
    let openApiDocumentHttpPostWithoutOperationId: OpenAPI.Document;
    let openApiDocumentHttpPutWithoutOperationId: OpenAPI.Document;
    let openApiDocumentHttpPatchWithoutOperationId: OpenAPI.Document;
    let openApiDocumentHttpDeleteWithoutOperationId: OpenAPI.Document;
    let openApiDocumentHttpOptionsWithoutOperationId: OpenAPI.Document;
    let openApiDocumentHttpHeadWithoutOperationId: OpenAPI.Document;
    let openApiDocumentPetStoreWithoutOperationId: OpenAPI.Document;

    before("load OpenAPI documents", (done) => {
      Promise.all([
        SwaggerParser.validate("test/data/openApiDocumentHttpGet.yaml"),
        SwaggerParser.validate("test/data/openApiDocumentHttpPost.yaml"),
        SwaggerParser.validate("test/data/openApiDocumentHttpPut.yaml"),
        SwaggerParser.validate("test/data/openApiDocumentHttpPatch.yaml"),
        SwaggerParser.validate("test/data/openApiDocumentHttpDelete.yaml"),
        SwaggerParser.validate("test/data/openApiDocumentHttpOptions.yaml"),
        SwaggerParser.validate("test/data/openApiDocumentHttpHead.yaml"),
        SwaggerParser.validate("test/data/openApiDocumentHttpGetWithoutOperationId.yaml"),
        SwaggerParser.validate("test/data/openApiDocumentHttpPostWithoutOperationId.yaml"),
        SwaggerParser.validate("test/data/openApiDocumentHttpPutWithoutOperationId.yaml"),
        SwaggerParser.validate("test/data/openApiDocumentHttpPatchWithoutOperationId.yaml"),
        SwaggerParser.validate("test/data/openApiDocumentHttpDeleteWithoutOperationId.yaml"),
        SwaggerParser.validate("test/data/openApiDocumentHttpOptionsWithoutOperationId.yaml"),
        SwaggerParser.validate("test/data/openApiDocumentHttpHeadWithoutOperationId.yaml"),
        SwaggerParser.validate("test/data/petStore.yaml"),
        SwaggerParser.validate("test/data/petStoreWithoutOperationId.yaml")
      ])
        .then((openApiDocuments) => {
          openApiDocumentHttpGet = openApiDocuments[0];
          openApiDocumentHttpPost = openApiDocuments[1];
          openApiDocumentHttpPut = openApiDocuments[2];
          openApiDocumentHttpPatch = openApiDocuments[3];
          openApiDocumentHttpDelete = openApiDocuments[4];
          openApiDocumentHttpOptions = openApiDocuments[5];
          openApiDocumentHttpHead = openApiDocuments[6];
          openApiDocumentHttpGetWithoutOperationId = openApiDocuments[7];
          openApiDocumentHttpPostWithoutOperationId = openApiDocuments[8];
          openApiDocumentHttpPutWithoutOperationId = openApiDocuments[9];
          openApiDocumentHttpPatchWithoutOperationId = openApiDocuments[10];
          openApiDocumentHttpDeleteWithoutOperationId = openApiDocuments[11];
          openApiDocumentHttpOptionsWithoutOperationId = openApiDocuments[12];
          openApiDocumentHttpHeadWithoutOperationId = openApiDocuments[13];
          openApiDocumentPetStore = openApiDocuments[14];
          openApiDocumentPetStoreWithoutOperationId = openApiDocuments[15];
          done();
        })
        .catch((error) => done(error));
    });

    it('should generate methods for HTTP request method GET', () => {
      expect(methodService.getMethodNamesForPaths(openApiDocumentHttpGet.paths)).to.deep.equal(
        [{"path":"/pets","operation":"get","methodName":"get"}]
      );
    });

    it('should generate methods for HTTP request method POST', () => {
      expect(methodService.getMethodNamesForPaths(openApiDocumentHttpPost.paths)).to.deep.equal(
        [{"path":"/pets","operation":"post","methodName":"post"}]
      );
    });

    it('should generate methods for HTTP request method PUT', () => {
      expect(methodService.getMethodNamesForPaths(openApiDocumentHttpPut.paths)).to.deep.equal(
        [{"path":"/pets","operation":"put","methodName":"put"}]
      );
    });

    it('should generate methods for HTTP request method PATCH', () => {
      expect(methodService.getMethodNamesForPaths(openApiDocumentHttpPatch.paths)).to.deep.equal(
        [{"path":"/pets","operation":"patch","methodName":"patch"}]
      );
    });

    it('should generate methods for HTTP request method DELETE', () => {
      expect(methodService.getMethodNamesForPaths(openApiDocumentHttpDelete.paths)).to.deep.equal(
        [{"path":"/pets","operation":"delete","methodName":"delete"}]
      );
    });

    it('should generate methods for HTTP request method OPTIONS', () => {
      expect(methodService.getMethodNamesForPaths(openApiDocumentHttpOptions.paths)).to.deep.equal(
        [{"path":"/pets","operation":"options","methodName":"options"}]
      );
    });

    it('should generate methods for HTTP request method HEAD', () => {
      expect(methodService.getMethodNamesForPaths(openApiDocumentHttpHead.paths)).to.deep.equal(
        [{"path":"/pets","operation":"head","methodName":"head"}]
      );
    });

    it('should generate methods for HTTP request method GET and missing operation ID', () => {
      expect(methodService.getMethodNamesForPaths(openApiDocumentHttpGetWithoutOperationId.paths)).to.deep.equal(
        [{"path":"/pets","operation":"get","methodName":"getPets"}]
      );
    });

    it('should generate methods for HTTP request method POST and missing operation ID', () => {
      expect(methodService.getMethodNamesForPaths(openApiDocumentHttpPostWithoutOperationId.paths)).to.deep.equal(
        [{"path":"/pets","operation":"post","methodName":"postPets"}]
      );
    });

    it('should generate methods for HTTP request method PUT and missing operation ID', () => {
      expect(methodService.getMethodNamesForPaths(openApiDocumentHttpPutWithoutOperationId.paths)).to.deep.equal(
        [{"path":"/pets","operation":"put","methodName":"putPets"}]
      );
    });

    it('should generate methods for HTTP request method PATCH and missing operation ID', () => {
      expect(methodService.getMethodNamesForPaths(openApiDocumentHttpPatchWithoutOperationId.paths)).to.deep.equal(
        [{"path":"/pets","operation":"patch","methodName":"patchPets"}]
      );
    });

    it('should generate methods for HTTP request method DELETE and missing operation ID', () => {
      expect(methodService.getMethodNamesForPaths(openApiDocumentHttpDeleteWithoutOperationId.paths)).to.deep.equal(
        [{"path":"/pets","operation":"delete","methodName":"deletePets"}]
      );
    });

    it('should generate methods for HTTP request method OPTIONS and missing operation ID', () => {
      expect(methodService.getMethodNamesForPaths(openApiDocumentHttpOptionsWithoutOperationId.paths)).to.deep.equal(
        [{"path":"/pets","operation":"options","methodName":"optionsPets"}]
      );
    });

    it('should generate methods for HTTP request method HEAD and missing operation ID', () => {
      expect(methodService.getMethodNamesForPaths(openApiDocumentHttpHeadWithoutOperationId.paths)).to.deep.equal(
        [{"path":"/pets","operation":"head","methodName":"headPets"}]
      );
    });

    it('should generate methods for the pet store example', () => {
      expect(methodService.getMethodNamesForPaths(openApiDocumentPetStore.paths)).to.deep.equal(
        [{"path":"/pets","operation":"get","methodName":"listPets"},
        {"path":"/pets","operation":"post","methodName":"createPets"},
        {"path":"/pets/{petId}","operation":"get","methodName":"showPetById"}]
      );
    });

    it('should generate methods for the pet store example and missing operation ID', () => {
      expect(methodService.getMethodNamesForPaths(openApiDocumentPetStoreWithoutOperationId.paths)).to.deep.equal(
        [{"path":"/pets","operation":"get","methodName":"getPets"},
        {"path":"/pets","operation":"post","methodName":"postPets"},
        {"path":"/pets/{petId}","operation":"get","methodName":"getPetsPetId"}]
      );
    });
  });
});
