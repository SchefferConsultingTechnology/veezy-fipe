import { referenceRouter } from '@modules/reference/infra/http/routes/reference.routes';
import { Router } from 'express';
import { modelsRouter } from '@modules/models/infra/routes/models.router';
import { yarmodelRouter } from '@modules/yearmodel/infra/http/routes/yearmodel.route';
import { vehiclesRouter } from '@modules/vehicles/infra/http/routes/vehicles.router';
import { brandsRouter } from '@modules/brand/infra/http/routes/brands.router';

const routes = Router();

routes.use('/reference', referenceRouter);
routes.use('/brands', brandsRouter);
routes.use('/models', modelsRouter);
routes.use('/yearmodel', yarmodelRouter);
routes.use('/vehicles', vehiclesRouter);

export { routes };
