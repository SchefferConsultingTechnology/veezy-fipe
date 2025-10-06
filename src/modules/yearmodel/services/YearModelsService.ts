import axios from 'axios';
import { IYearModel } from '../domain/models/IYearModel';
import { IYearModelParams } from '../domain/models/IYearModelParams';
import { jsonToObjectYearModel } from '../mappers/YearModelMapper';
import { IYearModelResponse } from '../domain/models/IYearModelResponse';
import { ResponseError } from '@shared/errors/ResponseError';

function isYearsModelResponseArray(data: any): data is IYearModel[] {
  return (
    Array.isArray(data) &&
    data.every(
      item =>
        item &&
        typeof item === 'object' &&
        typeof item.Label === 'string' &&
        typeof item.Value === 'string',
    )
  );
}

class YearModelsService {
  public async execute({
    reference,
    vehicleType,
    brand,
    model,
  }: IYearModelParams): Promise<IYearModel[] | null> {
    const url = `${process.env.APP_API_FIPE_URL}ConsultarAnoModelo`;
    const params = {
      codigoTabelaReferencia: reference,
      codigoTipoVeiculo: vehicleType,
      codigoMarca: brand,
      codigoModelo: model,
    };
    try {
      const resp = await axios.post<IYearModelResponse[]>(url, params);
      if (resp.status >= 400) {
        throw new ResponseError(
          `Erro HTTP da API FIPE: ${resp.status} - ${resp.statusText}`,
          resp.status,
        );
      }
      if (!isYearsModelResponseArray(resp.data)) {
        throw new ResponseError(
          'Formato inválido de resposta da API FIPE.',
          502,
        );
      }
      const result = await jsonToObjectYearModel(resp.data);
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

export { YearModelsService };
