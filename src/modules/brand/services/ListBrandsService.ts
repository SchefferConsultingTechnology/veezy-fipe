import axios from 'axios';
import { IBrands } from '../domain/models/IBrands';
import { ISearchParams } from '../domain/models/ISearchParams';
import { jsonToObjectBrands } from '../mappers/BrandsMapper';
import { IBrandsResponse } from '../domain/models/IBrandsResponse';
import { ResponseError } from '@shared/errors/ResponseError'; // caso já tenha essa classe customizada

function isBrandsResponseArray(data: any): data is IBrandsResponse[] {
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

class ListBrandsService {
  public async execute({
    reference,
    vehicleType,
  }: ISearchParams): Promise<IBrands[]> {
    const url = `${process.env.APP_API_FIPE_URL}ConsultarMarcas`;
    const params = {
      codigoTabelaReferencia: reference,
      codigoTipoVeiculo: vehicleType,
    };

    try {
      const resp = await axios.post(url, params);

      if (resp.status >= 400) {
        throw new ResponseError(
          `Erro HTTP da API FIPE: ${resp.status} - ${resp.statusText}`,
          resp.status,
        );
      }

      if (!isBrandsResponseArray(resp.data)) {
        throw new ResponseError(
          'Formato inválido de resposta da API FIPE.',
          502,
        );
      }

      const mapper = await jsonToObjectBrands(resp.data);
      return mapper;
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

export { ListBrandsService };
