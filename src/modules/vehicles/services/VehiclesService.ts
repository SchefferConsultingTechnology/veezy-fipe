import axios from 'axios';
import { IVehicles } from '../domain/models/IVehicles';
import { IVehiclesParams } from '../domain/models/IVehiclesParams';
import { jsonToObjectVehicle } from '../mappers/vehiclesMapper';
import { IBrandsResponse } from '@modules/brand/domain/models/IBrandsResponse';
import { IVehiclesResponse } from '../domain/models/IVehiclesResponse';
import { ResponseError } from '@shared/errors/ResponseError';

export function isVehicleResponseObject(
  data: unknown,
): data is IVehiclesResponse {
  if (data === null || typeof data !== 'object') return false;

  const obj = data as Record<string, unknown>;

  return (
    typeof obj.Valor === 'string' &&
    typeof obj.Marca === 'string' &&
    typeof obj.Modelo === 'string' &&
    typeof obj.AnoModelo === 'number' &&
    Number.isFinite(obj.AnoModelo) &&
    typeof obj.Combustivel === 'string' &&
    typeof obj.CodigoFipe === 'string' &&
    typeof obj.MesReferencia === 'string' &&
    typeof obj.Autenticacao === 'string' &&
    typeof obj.TipoVeiculo === 'number' &&
    Number.isFinite(obj.TipoVeiculo) &&
    typeof obj.SiglaCombustivel === 'string' &&
    typeof obj.DataConsulta === 'string'
  );
}
/* function isVehicleResponseObject(
  data: IVehiclesResponse,
): data is IVehiclesResponse {
  return (
    Array.isArray(data) &&
    data.every(
      item =>
        item &&
        typeof item === 'object' &&
        typeof item.Valor === 'string' &&
        typeof item.Marca === 'string' &&
        typeof item.Modelo === 'string' &&
        typeof item.AnoModelo === 'number' &&
        typeof item.Combustivel === 'string' &&
        typeof item.CodigoFipe === 'string' &&
        typeof item.MesReferencia === 'string' &&
        typeof item.Autenticacao === 'string' &&
        typeof item.TipoVeiculo === 'number' &&
        typeof item.SiglaCombustivel === 'string' &&
        typeof item.DataConsulta === 'string',
    )
  );
}
 */
class VehiclesService {
  public async execute({
    reference,
    vehicleType,
    brand,
    model,
    yearModel,
    codeFuel,
  }: IVehiclesParams): Promise<IVehicles | null> {
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
    try {
      const resp = await axios.post<IVehiclesResponse>(url, params);
      if (resp.status >= 400) {
        throw new ResponseError(
          `Erro HTTP da API FIPE: ${resp.status} - ${resp.statusText}`,
          resp.status,
        );
      }

      if (!isVehicleResponseObject(resp.data)) {
        throw new ResponseError(
          'Formato inválido de resposta da API FIPE.',
          502,
        );
      }

      const result = await jsonToObjectVehicle(resp.data);
      return result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || 500;
        const message =
          error.response?.data?.message ||
          `Erro na requisição para a API FIPE: ${error.message}`;
        throw new ResponseError(message, status);
      }

      throw new ResponseError('Erro inesperado ao consultar veiculo.', 500);
    }
  }
}

export { VehiclesService };
