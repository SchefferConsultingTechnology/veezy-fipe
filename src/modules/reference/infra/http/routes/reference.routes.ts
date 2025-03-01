import { Router } from 'express';
import { ReferenceController } from '../controllers/ReferenceController';

const referenceRouter = Router();
const referenceController = new ReferenceController();

referenceRouter.get('/', referenceController.index);

export { referenceRouter };
