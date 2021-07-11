import { expect } from 'chai';

import { FileReader } from '../../src/readers';
import { Formatter } from '../../src/formatter';

describe('Formatter', () => {
  describe('format', () => {

    it('should format JavaScript source code', () => {
      const reader = new FileReader();
      const unformattedSourceCode = reader.read('test/data/unformattedSourceCode');
      const expectedFormattedSourceCode = reader.read('test/data/expectedFormattedSourceCode');

      const formattedSourceCode = Formatter.formatJavaScript(unformattedSourceCode);

      expect(formattedSourceCode).to.equal(expectedFormattedSourceCode);
    });

    it('should format JavaScript source code that does not contain import statements', () => {
      const reader = new FileReader();
      const unformattedSourceCode = reader.read('test/data/unformattedSourceCodeWithoutImportStatements');
      const expectedFormattedSourceCode = reader.read('test/data/expectedFormattedSourceCodeWithoutImportStatements');

      const formattedSourceCode = Formatter.formatJavaScript(unformattedSourceCode);

      expect(formattedSourceCode).to.equal(expectedFormattedSourceCode);
    });
  });
});
