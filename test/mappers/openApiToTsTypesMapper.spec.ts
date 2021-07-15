import { expect } from 'chai';
import { OpenApiToTsTypesMapper } from '../../src/mappers';

describe('OpenApiToTsTypesMapper', () => {
  describe('getTsTypeForOpenApiType', () => {
    const data = [
      {openApiType: 'boolean', expectedTsType: 'boolean'},
      {openApiType: 'integer', expectedTsType: 'number'},
      {openApiType: 'number', expectedTsType: 'number'},
      {openApiType: 'string', expectedTsType: 'string'},
      {openApiType: 'invalid', expectedTsType: 'any'}
    ];

    data.forEach(entry => {
      it(`should return ${entry.expectedTsType} for OpenAPI type ${entry.openApiType}`, () => {
        const tsType = OpenApiToTsTypesMapper.getTsTypeForOpenApiType(entry.openApiType)
        expect(tsType).to.equal(entry.expectedTsType);
      });
    })
  });
});
