import {
  IAnos,
  IModelos,
  IModelsResponse,
} from '../domain/models/IModelsResponse';
import {
  IModels,
  IModelsVehicles,
  IYears,
} from '../domain/models/IModelsVehicles';

async function arrayToObjectModels(
  arrayObject: IModelos[],
): Promise<IModels[]> {
  return arrayObject.map(obj => {
    return {
      code: obj.Value,
      model: obj.Label,
    };
  });
}

async function arrayToObjectYears(object: IAnos[]): Promise<IYears[]> {
  return object.map(obj => {
    return {
      code: obj.Value,
      description: obj.Label,
      fuelCode: obj.Value.split('-')[1],
      fuelDescription: obj.Label.split(' ')[1],
    };
  });
}

export async function jsonToObjectModels(
  object: IModelsResponse,
): Promise<IModelsVehicles> {
  return {
    models: await arrayToObjectModels(object.Modelos),
    years: await arrayToObjectYears(object.Anos),
  };
}
