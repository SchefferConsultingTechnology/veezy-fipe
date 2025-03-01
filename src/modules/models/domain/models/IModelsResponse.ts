export interface IModelos {
  Label: string;
  Value: string;
}

export interface IAnos {
  Label: string;
  Value: string;
}

export interface IModelsResponse {
  Modelos: Array<IModelos>;
  Anos: Array<IAnos>;
}
