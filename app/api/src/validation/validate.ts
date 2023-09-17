import { validate } from "class-validator";

export class Validate {
    async validateSchema(schema: any): Promise<string[] | null> {
        const errors = await validate(schema);
        return errors.length > 0 ? errors.map(error => error.toString()) : null;
    }
}
