import { expect } from 'chai';
import { FileReader } from '../../src/readers';

describe('File reader', () => {
  describe('read', () => {

    const reader = new FileReader();

    it('should read an existing file', () => {
      const result = reader.read('test/data/fileReaderTest');
      expect(result).to.equal('This is a test.\n');
    });

    it('should read an existing file with special characters', () => {
      const result = reader.read('test/data/fileReaderTestWithDiacritics');
      expect(result).to.equal('My fiancée likes the façade pattern.\n');
    });

    it('should try to read a non-existent file', () => {
      try {
        reader.read('test/data/nonExistentFile');
      } catch (error) {
        expect(error.message).to.equal(`ENOENT: no such file or directory, open 'test/data/nonExistentFile'`);
      }
    });

    it('should try to read a file with an empty file name', () => {
      try {
        reader.read('');
      } catch (error) {
        expect(error.message).to.equal(`ENOENT: no such file or directory, open`);
      }
    });
  });
});
