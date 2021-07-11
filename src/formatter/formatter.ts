import * as jsBeautify from 'js-beautify';
const beautify = jsBeautify.js;

export class Formatter {
  private static readonly options = {
    indent_size: 2,
  };

  static formatJavaScript(classAsString: string): string {
    const classInLines = classAsString.split('\n');
    const importStatements = classInLines.filter(line => line.indexOf('import') > -1);
    const classStatements = classInLines.filter(line => line.indexOf('import') < 0);
    const beautifiedClass = beautify(classStatements.join('\n'), this.options)
      .replace(/ < /g, '<')
      .replace(/ > ;/g, '>;')
      .replace(/ > {/g, '> {');
    return importStatements.length > 0 ? `${importStatements.join('\n')}\n\n${beautifiedClass}\n` : `${beautifiedClass}\n`;
  }
}
