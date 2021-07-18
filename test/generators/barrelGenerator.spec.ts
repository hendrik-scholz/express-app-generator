import { expect } from "chai";

import { FileReader } from "../../src/readers";
import { Content, TypeEnum } from "../../src/types";
import { BarrelGenerator } from "../../src/generators";

describe("Barrel generator", () => {
  describe("generate", () => {
    const reader = new FileReader();

    it("should generate barrel source code for controller", () => {
      const controllerContent: Content = {
        name: 'Controller',
        type: TypeEnum.controller,
        classAsString: '// test'
      };
      const expectedControllerBarrelSourceCode = reader.read(
        "test/data/expectedControllerBarrelSourceCode"
      );

      const barrelGenerator = new BarrelGenerator(
        reader
      );
      const controllerBarrelContent = barrelGenerator.generate(controllerContent);

      expect(controllerBarrelContent.classAsString).equal(
        expectedControllerBarrelSourceCode
      );
    });

    it("should generate barrel source code for service", () => {
      const serviceContent: Content = {
        name: 'ServiceImpl',
        type: TypeEnum.service,
        classAsString: '// test'
      };
      const expectedServiceImplBarrelSourceCode = reader.read(
        "test/data/expectedServiceBarrelSourceCode"
      );

      const barrelGenerator = new BarrelGenerator(
        reader
      );
      const serviceImplBarrelContent = barrelGenerator.generate(serviceContent);

      expect(serviceImplBarrelContent.classAsString).equal(
        expectedServiceImplBarrelSourceCode
      );
    });

    it("should generate barrel source code for types", () => {
      const typeContent: Content = {
        name: 'Type',
        type: TypeEnum.type,
        classAsString: '// test'
      };
      const expectedTypesBarrelSourceCode = reader.read(
        "test/data/expectedTypesBarrelSourceCode"
      );

      const barrelGenerator = new BarrelGenerator(
        reader
      );
      const typesBarrelContent = barrelGenerator.generate(typeContent);

      expect(typesBarrelContent.classAsString).equal(
        expectedTypesBarrelSourceCode
      );
    });

    it("should generate barrel source code for barrel", () => {
      const typeContent: Content = {
        name: 'Barrel',
        type: TypeEnum.barrel,
        classAsString: '// test'
      };
      const expectedBarrelSourceCode = reader.read(
        "test/data/expectedBarrelSourceCode"
      );

      const barrelGenerator = new BarrelGenerator(
        reader
      );
      const barrelContent = barrelGenerator.generate(typeContent);

      expect(barrelContent.classAsString).equal(
        expectedBarrelSourceCode
      );
    });
  });
});
