import { ListBrandsService } from '@modules/brand/services/ListBrandsService';
import { Request, Response } from 'express';

class BrandsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { reference, vehicleType } = request.body;
    const listBrands = new ListBrandsService();
    const responseData = await listBrands.execute({
      reference,
      vehicleType,
    });
    const result = responseData;

    return response.json(result);
  }
}

export { BrandsController };
