import { VehiclesService } from '@modules/vehicles/services/VehiclesService';
import { Request, Response } from 'express';

class VehiclesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { reference, vehicleType, brand, model, yearModel, codeFuel } =
      request.body;
    const showVehicle = new VehiclesService();
    const result = await showVehicle.execute({
      reference,
      vehicleType,
      brand,
      model,
      yearModel,
      codeFuel,
    });
    return response.json(result);
  }
}

export { VehiclesController };
