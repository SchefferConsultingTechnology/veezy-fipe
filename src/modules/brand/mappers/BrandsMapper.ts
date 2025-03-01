import { IBrands } from '../domain/models/IBrands';
import { IBrandsResponse } from '../domain/models/IBrandsResponse';

export async function jsonToObjectBrands(
  objectArray: IBrandsResponse[],
): Promise<IBrands[]> {
  return objectArray.map(obj => {
    return {
      code: obj.Value,
      brand: obj.Label,
    };
  });
}
