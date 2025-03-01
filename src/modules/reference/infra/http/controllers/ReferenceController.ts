import { ListReferenceService } from '@modules/reference/services/ListReferenceService';
import { Request, Response } from 'express';
class ReferenceController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listReference = new ListReferenceService();
    const result = await listReference.execute();
    return response.json(result);
  }
}

export { ReferenceController };
