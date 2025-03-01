import axios from 'axios';
import { IBrands } from '../domain/models/IBrands';
import { ISearchParams } from '../domain/models/ISearchParams';
import { jsonToObjectBrands } from '../mappers/BrandsMapper';

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
    const resp = await axios.post(url, params);
    const mapper = await jsonToObjectBrands(resp.data);
    return mapper;
  }
}

export { ListBrandsService };
