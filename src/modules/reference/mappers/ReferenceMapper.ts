import { IReference } from '../domain/models/IReference';
import { IReferenceResponse } from '../domain/models/IReferenceResponse';

export async function jsonToObjectReference(
  objectArray: IReferenceResponse[],
): Promise<IReference[]> {
  return objectArray.map(obj => {
    return {
      code: obj.Codigo,
      month: obj.Mes,
    };
  });
}
