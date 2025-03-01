import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { YearModelController } from '../controllers/YearModelController';

const yarmodelRouter = Router();
const yearModelController = new YearModelController();

yarmodelRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      reference: Joi.string().required(),
      vehicleType: Joi.string().required(),
      brand: Joi.string().required(),
      model: Joi.string().required(),
    },
  }),
  yearModelController.index,
);

export { yarmodelRouter };
