import axios from 'axios';
import { IModelSearchParams } from '../domain/models/IModelSearchParams';
import { IModelsVehicles } from '../domain/models/IModelsVehicles';
import { jsonToObjectModels } from '../mappers/ModelsMapper';
import {
  IAnos,
  IModelos,
  IModelsResponse,
} from '../domain/models/IModelsResponse';
import { ResponseError } from '@shared/errors/ResponseError';

function isModelsVehiclesResponse(
  data: IModelsResponse,
): data is { Modelos: IModelos[]; Anos: IAnos[] } {
  return (
    data &&
    typeof data === 'object' &&
    Array.isArray(data.Modelos) &&
    Array.isArray(data.Anos) &&
    data.Modelos.every(
      item =>
        item &&
        typeof item.Label === 'string' &&
        typeof item.Value === 'number',
    ) &&
    data.Anos.every(
      item =>
        item &&
        typeof item.Label === 'string' &&
        typeof item.Value === 'string',
    )
  );
}

class ListModelsService {
  public async execute({
    reference,
    vehicleType,
    brand,
  }: IModelSearchParams): Promise<IModelsVehicles | null> {
    const url = `${process.env.APP_API_FIPE_URL}ConsultarModelos`;
    const params = {
      codigoTabelaReferencia: reference,
      codigoTipoVeiculo: vehicleType,
      codigoMarca: brand,
    };
    try {
      const resp = await axios.post(url, params);
      if (resp.status >= 400) {
        throw new ResponseError(
          `Erro HTTP da API FIPE: ${resp.status} - ${resp.statusText}`,
          resp.status,
        );
      }
      if (!isModelsVehiclesResponse(resp.data)) {
        throw new ResponseError(
          'Formato inválido de resposta da API FIPE.',
          502,
        );
      }
      const result = await jsonToObjectModels(resp.data);
      return result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || 500;
        const message =
          error.response?.data?.message ||
          `Erro na requisição para a API FIPE: ${error.message}`;
        throw new ResponseError(message, status);
      }
      throw new ResponseError('Erro inesperado ao consultar marcas.', 500);
    }
  }
}

export { ListModelsService };
