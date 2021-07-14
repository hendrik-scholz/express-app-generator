import { OpenAPI } from "openapi-types";
import SwaggerParser from "@apidevtools/swagger-parser";
import { expect } from "chai";

import { FileReader } from "../../src/readers";
import { TypeEnum } from "../../src/types";
import { TypesGenerator } from "../../src/generators";

describe("Types generator", () => {
  describe("generate", () => {
    const reader = new FileReader();

    let openApiDocumentPetStore: OpenAPI.Document;
    let openApiDocumentPetStoreWithoutTypes: OpenAPI.Document;

    before("load OpenAPI documents", (done) => {
      Promise.all([
        SwaggerParser.validate("test/data/petStore.yaml"),
        SwaggerParser.validate("test/data/petStoreWithoutTypes.yaml")
      ])
        .then((openApiDocument) => {
          openApiDocumentPetStore = openApiDocument[0];
          openApiDocumentPetStoreWithoutTypes = openApiDocument[1];
          done();
        })
        .catch((error) => done(error));
    });

    it("should generate types source code for the pet store example", () => {
      const expectedTypeSourceCodePet = reader.read(
        "test/data/expectedTypeSourceCodePet"
      );
      const expectedTypeSourceCodeError = reader.read(
        "test/data/expectedTypeSourceError"
      );

      const typesGenerator = new TypesGenerator(
        openApiDocumentPetStore,
        reader
      );
      const content = typesGenerator.generate();

      const contentPet = content.filter(cont => cont.name === 'Pet')[0];
      const contentError = content.filter(cont => cont.name === 'Error')[0];

      expect(contentPet.name).to.equal('Pet');
      expect(contentPet.type).to.equal(TypeEnum.type);
      expect(contentPet.classAsString).equal(
        expectedTypeSourceCodePet
      );
      expect(contentError.name).to.equal('Error');
      expect(contentError.type).to.equal(TypeEnum.type);
      expect(contentError.classAsString).equal(
        expectedTypeSourceCodeError
      );
    });

    it("should generate types source code for the pet store example without types", () => {
      const expectedTypeSourceCodePet = reader.read(
        "test/data/expectedTypeSourceCodePetWithoutTypes"
      );
      const expectedTypeSourceCodeError = reader.read(
        "test/data/expectedTypeSourceErrorWithoutTypes"
      );

      const typesGenerator = new TypesGenerator(
        openApiDocumentPetStoreWithoutTypes,
        reader
      );
      const content = typesGenerator.generate();

      const contentPet = content.filter(cont => cont.name === 'Pet')[0];
      const contentError = content.filter(cont => cont.name === 'Error')[0];

      expect(contentPet.name).to.equal('Pet');
      expect(contentPet.type).to.equal(TypeEnum.type);
      expect(contentPet.classAsString).equal(
        expectedTypeSourceCodePet
      );
      expect(contentError.name).to.equal('Error');
      expect(contentError.type).to.equal(TypeEnum.type);
      expect(contentError.classAsString).equal(
        expectedTypeSourceCodeError
      );
    });
  });
});
