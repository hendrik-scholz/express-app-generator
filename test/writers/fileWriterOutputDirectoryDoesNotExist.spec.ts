import { expect } from 'chai';
import * as fs from 'fs';
import { FileReader } from '../../src/readers';

import { Content, TypeEnum } from '../../src/types';
import { FileWriter } from '../../src/writers';

describe('File writer - output directory does not exist', () => {
  describe('write', () => {

    const outputDirectory = './test/tmp/';
    const reader = new FileReader();
    const writer = new FileWriter(outputDirectory);

    before(() => {
      if (fs.existsSync(outputDirectory)) {
        fs.rmdirSync(outputDirectory, { recursive: true });
      }
    });

    after(() => {
      fs.rmdirSync(outputDirectory, { recursive: true });
    });

    it('should write a file for type app', () => {
      const content: Content = {
        name: 'appTest',
        type: TypeEnum.app,
        classAsString: '// app test'
      };
      writer.write(content);
      const fileContent = reader.read(`${outputDirectory}/appTest.ts`);
      expect(fileContent).to.equal('// app test');
    });

    it('should write a file for type controller', () => {
      const content: Content = {
        name: 'controllerTest',
        type: TypeEnum.controller,
        classAsString: '// controller test'
      };
      writer.write(content);
      const fileContent = reader.read(`${outputDirectory}/controllers/controllerTest.ts`);
      expect(fileContent).to.equal('// controller test');
    });

    it('should write a file for type service', () => {
      const content: Content = {
        name: 'serviceTest',
        type: TypeEnum.service,
        classAsString: '// service test'
      };
      writer.write(content);
      const fileContent = reader.read(`${outputDirectory}/services/serviceTest.ts`);
      expect(fileContent).to.equal('// service test');
    });

    it('should write a file for type type', () => {
      const content: Content = {
        name: 'typeTest',
        type: TypeEnum.type,
        classAsString: '// type test'
      };
      writer.write(content);
      const fileContent = reader.read(`${outputDirectory}/types/typeTest.ts`);
      expect(fileContent).to.equal('// type test');
    });
  });
});
