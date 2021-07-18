import { expect } from "chai";
import { AppGenerator } from "../../src/generators/appGenerator";

import { FileReader } from "../../src/readers";
import { Content, TypeEnum } from "../../src/types";

describe("App generator", () => {
  describe("generate", () => {
    const reader = new FileReader();

    it("should generate app source code", () => {
      const controllerContent: Content = {
        name: 'Controller',
        type: TypeEnum.controller,
        classAsString: '// test'
      };
      const serviceContent: Content = {
        name: 'ServiceImpl',
        type: TypeEnum.service,
        classAsString: '// test'
      };
      const expectedAppSourceCode = reader.read(
        "test/data/expectedAppSourceCode"
      );

      const appGenerator = new AppGenerator(
        reader
      );
      const appContent = appGenerator.generate(controllerContent, serviceContent);

      expect(appContent.classAsString).equal(
        expectedAppSourceCode
      );
    });
  });
});
