export interface IModels {
  model: string;
  code: string;
}

export interface IYears {
  description: string;
  code: string;
  fuelCode: string;
  fuelDescription: string;
}

export interface IModelsVehicles {
  models: Array<IModels>;
  years: Array<IYears>;
}
