import axios from 'axios';
import { IYearModel } from '../domain/models/IYearModel';
import { IYearModelParams } from '../domain/models/IYearModelParams';
import { jsonToObjectYearModel } from '../mappers/YearModelMapper';

class YearModelsService {
  public async execute({
    reference,
    vehicleType,
    brand,
    model,
  }: IYearModelParams): Promise<IYearModel[]> {
    const url = `${process.env.APP_API_FIPE_URL}ConsultarAnoModelo`;
    const params = {
      codigoTabelaReferencia: reference,
      codigoTipoVeiculo: vehicleType,
      codigoMarca: brand,
      codigoModelo: model,
    };
    const resp = await axios.post(url, params);
    const result = await jsonToObjectYearModel(resp.data);
    return result;
  }
}

export { YearModelsService };
