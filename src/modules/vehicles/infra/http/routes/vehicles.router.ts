import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { VehiclesController } from '../controllers/VehiclesController';

const vehiclesRouter = Router();
const vehiclesController = new VehiclesController();

vehiclesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      reference: Joi.string().required(),
      vehicleType: Joi.string().required(),
      brand: Joi.string().required(),
      model: Joi.string().required(),
      yearModel: Joi.string().required(),
      codeFuel: Joi.string().required(),
    },
  }),
  vehiclesController.index,
);

export { vehiclesRouter };
