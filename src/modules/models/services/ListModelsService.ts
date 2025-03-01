import axios from 'axios';
import { IModelSearchParams } from '../domain/models/IModelSearchParams';
import { IModelsVehicles } from '../domain/models/IModelsVehicles';
import { jsonToObjectModels } from '../mappers/ModelsMapper';

class ListModelsService {
  public async execute({
    reference,
    vehicleType,
    brand,
  }: IModelSearchParams): Promise<IModelsVehicles> {
    const url = `${process.env.APP_API_FIPE_URL}ConsultarModelos`;
    const params = {
      codigoTabelaReferencia: reference,
      codigoTipoVeiculo: vehicleType,
      codigoMarca: brand,
    };
    const resp = await axios.post(url, params);
    const result = await jsonToObjectModels(resp.data);
    return result;
  }
}

export { ListModelsService };
