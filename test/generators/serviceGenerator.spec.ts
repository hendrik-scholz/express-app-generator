import { OpenAPI } from "openapi-types";
import SwaggerParser from "@apidevtools/swagger-parser";
import { expect } from "chai";

import { FileReader } from "../../src/readers";
import { TypeEnum } from "../../src/types";
import { DefaultMethodBodyGenerator, NoMethodBodyGenerator, ServiceGenerator } from "../../src/generators";
import { MethodService } from "../../src/service";

describe("Service generator", () => {
  describe("generate", () => {
    const reader = new FileReader();
    const methodService = new MethodService();

    let openApiDocumentPetStore: OpenAPI.Document;

    before("load OpenAPI documents", (done) => {
        SwaggerParser.validate("test/data/petStore.yaml")
        .then((openApiDocument) => {
          openApiDocumentPetStore = openApiDocument;
          done();
        })
        .catch((error) => done(error));
    });

    it("should generate service source code for the pet store example", () => {
      const noMethodBodyGenerator = new NoMethodBodyGenerator();
      const expectedServiceSourceCode = reader.read(
        "test/data/expectedServiceSourceCodePetStore"
      );
      const serviceGenerator = new ServiceGenerator(
        '',
        methodService.getMethodNamesForPaths(openApiDocumentPetStore.paths),
        reader,
        noMethodBodyGenerator
      );
      const content = serviceGenerator.generate();

      expect(content.name).to.equal("Service");
      expect(content.type).to.equal(TypeEnum.service);
      expect(content.classAsString).equal(
        expectedServiceSourceCode
      );
    });

    it("should generate service implementation source code for the pet store example", () => {
      const defaultMethodBodyGenerator = new DefaultMethodBodyGenerator();
      const expectedServiceSourceCode = reader.read(
        "test/data/expectedServiceImplementationSourceCodePetStore"
      );
      const serviceGenerator = new ServiceGenerator(
        '',
        methodService.getMethodNamesForPaths(openApiDocumentPetStore.paths),
        reader,
        defaultMethodBodyGenerator
      );
      const content = serviceGenerator.generate();

      expect(content.name).to.equal("Service");
      expect(content.type).to.equal(TypeEnum.service);
      expect(content.classAsString).equal(
        expectedServiceSourceCode
      );
    });
  });
});
