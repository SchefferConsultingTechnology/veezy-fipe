import { ListModelsService } from '@modules/models/services/ListModelsService';
import { Request, Response } from 'express';

class ModelsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { reference, vehicleType, brand } = request.body;
    const listModels = new ListModelsService();
    const result = await listModels.execute({
      reference,
      vehicleType,
      brand,
    });
    return response.json(result);
  }
}

export { ModelsController };
