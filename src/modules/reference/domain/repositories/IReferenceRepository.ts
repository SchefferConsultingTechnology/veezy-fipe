import { IReferenceResponse } from '../models/IReferenceResponse';

export interface IReferenceRepository {
  findAll(): Promise<IReferenceResponse[]>;
}
