import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { BrandsController } from '../controllers/BrandsController';

const brandsRouter = Router();
const brandsController = new BrandsController();

brandsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      reference: Joi.string().required(),
      vehicleType: Joi.string().required(),
    },
  }),
  brandsController.index,
);

export { brandsRouter };
