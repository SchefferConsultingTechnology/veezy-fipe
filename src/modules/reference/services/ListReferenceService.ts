import axios from 'axios';
import { IReference } from '../domain/models/IReference';
import { jsonToObjectReference } from '../mappers/ReferenceMapper';

class ListReferenceService {
  public async execute(): Promise<IReference[]> {
    const url = `${process.env.APP_API_FIPE_URL}ConsultarTabelaDeReferencia`;
    const resp = await axios.post(url);
    const result = resp.data;
    const mapper = await jsonToObjectReference(result);
    return mapper;
  }
}

export { ListReferenceService };
