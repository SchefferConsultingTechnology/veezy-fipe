import { IYearModel } from '../domain/models/IYearModel';
import { IYearModelResponse } from '../domain/models/IYearModelResponse';

export async function jsonToObjectYearModel(
  arrayToObject: IYearModelResponse[],
): Promise<IYearModel[]> {
  return arrayToObject.map(obj => {
    return {
      code: obj.Value,
      description: obj.Label,
      fuelCode: obj.Value.split('-')[1],
      fuelDescription: obj.Label.split(' ')[1],
    };
  });
}
