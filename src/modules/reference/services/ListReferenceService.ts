import axios from 'axios';
import { IReference } from '../domain/models/IReference';
import { jsonToObjectReference } from '../mappers/ReferenceMapper';
import { ResponseError } from '@shared/errors/ResponseError';
import { IReferenceResponse } from '../domain/models/IReferenceResponse';

function isReferencewResponseArray(
  data: unknown,
): data is IReferenceResponse[] {
  return (
    Array.isArray(data) &&
    data.every(item => {
      const obj = item as Record<string, unknown>;
      return (
        obj &&
        typeof obj === 'object' &&
        typeof obj.Codigo === 'number' &&
        typeof obj.Mes === 'string'
      );
    })
  );
}

class ListReferenceService {
  public async execute(): Promise<IReference[] | null> {
    const url = `${process.env.APP_API_FIPE_URL}ConsultarTabelaDeReferencia`;

    try {
      const resp = await axios.post(url);
      const result = resp.data;
      if (resp.status >= 400) {
        throw new ResponseError(
          `Erro HTTP da API FIPE: ${resp.status} - ${resp.statusText}`,
          resp.status,
        );
      }
      if (!isReferencewResponseArray(resp.data)) {
        throw new ResponseError(
          'Formato inválido de resposta da API FIPE.',
          502,
        );
      }
      const mapper = await jsonToObjectReference(result);
      return mapper;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || 500;
        const message =
          error.response?.data?.message ||
          `Erro na requisição para a API FIPE: ${error.message}`;
        throw new ResponseError(message, status);
      }
      throw new ResponseError('Erro inesperado ao consultar refêrencias.', 500);
    }
  }
}

export { ListReferenceService };
