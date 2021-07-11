import express, { Request, Response } from 'express';
import { Service } from '../services';

export class SwaggerPetStoreController {

  static start(service: Service, port: number) {
    const app = express();

    app.get('/pets', (req: Request, res: Response) =>
      service.listPets()
      .then((data: any) => res.sendStatus(204))
      .catch((error: any) => res.sendStatus(500)));

    app.post('/pets', (req: Request, res: Response) =>
      service.createPets()
      .then((data: any) => res.sendStatus(204))
      .catch((error: any) => res.sendStatus(500)));

    app.get('/pets/:petId', (req: Request, res: Response) =>
      service.showPetById()
      .then((data: any) => res.sendStatus(204))
      .catch((error: any) => res.sendStatus(500)));

    app.listen(port, () => console.log(`SwaggerPetStore app listening on port ${port}!`));
  }
}
