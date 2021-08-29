import * as fs from 'fs';

import { BarrelGenerator, ControllerGenerator, DefaultMethodBodyGenerator, NoMethodBodyGenerator, PostmanEnvironmentGenerator, ServiceGenerator, TypesGenerator } from './generators';
import { FileReader } from './readers';

import SwaggerParser from '@apidevtools/swagger-parser';
import { FileWriter } from './writers';
import { TypeEnum } from './types';
import { AppGenerator } from './generators/appGenerator';
import { PostmanProjectGenerator } from './generators/postmanProjectGenerator';
import { MethodService } from './service';

const openApiDocumentInputFile = process.argv[2];
const outputDirectory = process.argv[3];

if (openApiDocumentInputFile && outputDirectory) {
  console.log(`Input file: ${openApiDocumentInputFile}`);
  console.log(`Output directory: ${outputDirectory}`);
} else {
  console.log('Input file and / or output directory not given.');
  process.exit();
}

const reader = new FileReader();
const writer = new FileWriter(outputDirectory);

SwaggerParser.validate(openApiDocumentInputFile)
    .then(openApiDocument => {
      const methodService = new MethodService();
      const methods = methodService.getMethodNamesForPaths(openApiDocument.paths);
      const title = openApiDocument.info.title.replace(/ /g, '');

      const barrelGenerator = new BarrelGenerator(reader);

      const typesGenerator = new TypesGenerator(openApiDocument, reader);
      const typeBarrel: any[] = [];
      typesGenerator.generate()
        .forEach(typeContent => {
          writer.write(typeContent);
          typeBarrel.push(barrelGenerator.generate(typeContent));
        });

      const barrelContent = typeBarrel.map(content => content.classAsString).join('');

      writer.write({
        name: 'index',
        type: TypeEnum.type,
        classAsString: barrelContent
      });

      const noMethodBodyGenerator = new NoMethodBodyGenerator();
      const serviceGenerator = new ServiceGenerator('', methods, reader, noMethodBodyGenerator);
      const serviceContent = serviceGenerator.generate();
      writer.write(serviceContent);
      writer.write(barrelGenerator.generate(serviceContent));

      const defaultMethodBodyGenerator = new DefaultMethodBodyGenerator();
      const serviceImplGenerator = new ServiceGenerator(title, methods, reader, defaultMethodBodyGenerator);
      const serviceImplContent = serviceImplGenerator.generate();
      writer.write(serviceImplContent);
      writer.write(barrelGenerator.generate(serviceImplContent));

      const controllerGenerator = new ControllerGenerator(title, methods, reader);
      const controllerContent = controllerGenerator.generate();
      writer.write(controllerContent);

      writer.write(barrelGenerator.generate(controllerContent));

      const appGenerator = new AppGenerator(reader);
      writer.write(appGenerator.generate(controllerContent, serviceImplContent));

      fs.readdirSync('./templates/project').forEach(filename =>
        fs.copyFileSync(`./templates/project/${filename}`, `${outputDirectory}/${filename}`));

      const postmanEnvironmentGenerator = new PostmanEnvironmentGenerator(openApiDocument, reader);
      writer.writeStringToFile(postmanEnvironmentGenerator.generate(), `${title}.postman_environment.json`);

      const postmanProjectGenerator = new PostmanProjectGenerator(openApiDocument, reader);
      writer.writeStringToFile(postmanProjectGenerator.generate(), `${title}.postman_collection.json`);
    })
    .catch(error => console.log(error));
