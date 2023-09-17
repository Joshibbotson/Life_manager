// api/validation.middleware.ts
import { Request, Response, Next } from 'restify';
import { ValidationService } from './validation.service';

export function validateSchemaMiddleware(schemaClass: any) {
  return async (req: Request, res: Response, next: Next) => {
    try {
      const schemaInstance = new schemaClass(req.body);
      const validationService = new ValidationService();
      const validationErrors = await validationService.validateSchema(schemaInstance);

      if (validationErrors) {
        res.status(400);
        res.send({ errors: validationErrors });
      } else {
        req.body = schemaInstance;
        next();
      }
    } catch (error) {
      res.status(500);
      res.send({ message: 'Internal Server Error' });
    }
  };
}
