import { IVehicles } from '../domain/models/IVehicles';
import { IVehiclesResponse } from '../domain/models/IVehiclesResponse';

export async function jsonToObjectVehicle(
  object: IVehiclesResponse,
): Promise<IVehicles> {
  return {
    value: object.Valor,
    brand: object.Marca,
    model: object.Modelo,
    yearModel: object.AnoModelo,
    fuel: object.Combustivel,
    fipeCode: object.CodigoFipe,
    reference: object.MesReferencia,
    authentication: object.Autenticacao,
    vehicleType: object.TipoVeiculo,
    acronymFuel: object.SiglaCombustivel,
    consultDate: object.DataConsulta,
  };
}
