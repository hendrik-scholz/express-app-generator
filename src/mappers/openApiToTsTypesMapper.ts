export class OpenApiToTsTypesMapper {

  private static readonly tsTypeOpenApiTypeMap: Map<string, string> = new Map([
    ['boolean', 'boolean'],
    ['integer', 'number'],
    ['number', 'number'],
    ['string', 'string'],
  ]);

  static getTsTypeForOpenApiType(openApiType: string): string {
    const entry = this.tsTypeOpenApiTypeMap.get(openApiType);
    return entry ? entry : 'any';
  }
}
