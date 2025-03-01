import { YearModelsService } from '@modules/yearmodel/services/YearModelsService';
import { Request, Response } from 'express';

class YearModelController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { reference, vehicleType, brand, model } = request.body;
    const listYearModels = new YearModelsService();
    const result = await listYearModels.execute({
      reference,
      vehicleType,
      brand,
      model,
    });
    return response.json(result);
  }
}
export { YearModelController };
