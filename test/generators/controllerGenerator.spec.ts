import { OpenAPI } from 'openapi-types';
import SwaggerParser from '@apidevtools/swagger-parser';
import { expect } from 'chai';

import { ControllerGenerator } from '../../src/generators';
import { FileReader } from '../../src/readers';
import { TypeEnum } from '../../src/types';
import { MethodService } from '../../src/service';

describe('Controller generator', () => {
  describe('generate', () => {
    const reader = new FileReader();
    const methodService = new MethodService();

    let openApiDocumentGetWithPathParams: OpenAPI.Document;
    let openApiDocumentPetStore: OpenAPI.Document;

    before('load OpenAPI documents', (done) => {
      Promise.all([
        SwaggerParser.validate('test/data/openApiDocumentHttpGetWithPathParams.yaml'),
        SwaggerParser.validate('test/data/petStore.yaml')
      ])
        .then((openApiDocument) => {
          openApiDocumentGetWithPathParams = openApiDocument[0];
          openApiDocumentPetStore = openApiDocument[1];
          done();
        })
        .catch((error) => done(error));
    });

    it('should generate controller source code for a path with path params', () => {
      const expectedControllerSourceCode = reader.read(
        'test/data/expectedControllerSourceCodeGetWithPathParams'
      );
      const controllerGenerator = new ControllerGenerator(
        'SwaggerPetStore',
        methodService.getMethodNamesForPaths(openApiDocumentGetWithPathParams.paths),
        reader
      );
      const content = controllerGenerator.generate();

      expect(content.name).to.equal('SwaggerPetStoreController');
      expect(content.type).to.equal(TypeEnum.controller);
      expect(content.classAsString).equal(
        expectedControllerSourceCode
      );
    });

    it('should generate controller source code for the pet store example', () => {
      const expectedControllerSourceCode = reader.read(
        'test/data/expectedControllerSourceCodePetStore'
      );
      const controllerGenerator = new ControllerGenerator(
        'SwaggerPetStore',
        methodService.getMethodNamesForPaths(openApiDocumentPetStore.paths),
        reader
      );
      const content = controllerGenerator.generate();

      expect(content.name).to.equal('SwaggerPetStoreController');
      expect(content.type).to.equal(TypeEnum.controller);
      expect(content.classAsString).equal(
        expectedControllerSourceCode
      );
    });
  });
});
