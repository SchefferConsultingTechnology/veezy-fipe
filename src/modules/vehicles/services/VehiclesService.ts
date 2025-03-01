import axios from 'axios';
import { IVehicles } from '../domain/models/IVehicles';
import { IVehiclesParams } from '../domain/models/IVehiclesParams';
import { jsonToObjectVehicle } from '../mappers/vehiclesMapper';

class VehiclesService {
  public async execute({
    reference,
    vehicleType,
    brand,
    model,
    yearModel,
    codeFuel,
  }: IVehiclesParams): Promise<IVehicles> {
    const url = `${process.env.APP_API_FIPE_URL}ConsultarValorComTodosParametros`;
    const params = {
      codigoTabelaReferencia: reference,
      codigoTipoVeiculo: vehicleType,
      codigoMarca: brand,
      codigoModelo: model,
      anoModelo: yearModel,
      codigoTipoCombustivel: codeFuel,
      tipoVeiculo:
        vehicleType === '1'
          ? 'carro'
          : vehicleType === '2'
          ? 'moto'
          : 'caminhao',
      modeloCodigoExterno: null,
      tipoConsulta: 'tradicional',
    };
    const resp = await axios.post(url, params);
    const result = await jsonToObjectVehicle(resp.data);
    return result;
  }
}

export { VehiclesService };
