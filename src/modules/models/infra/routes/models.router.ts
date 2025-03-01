import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ModelsController } from '../controllers/ModelsController';

const modelsRouter = Router();
const modelsController = new ModelsController();

modelsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      reference: Joi.string().required(),
      vehicleType: Joi.string().required(),
      brand: Joi.string().required(),
    },
  }),
  modelsController.index,
);

export { modelsRouter };
