import { plainToInstance } from 'class-transformer'
import { validateOrReject } from 'class-validator'

enum ValidateErrors {
  additionalFields = 'Extra fields found: ',
}

export class Validate {
  public async validateSchema(data: any, schema: any): Promise<void> {
    try {
      const formattedData = new schema()
      const schemaInstance = plainToInstance(schema, data)
      const schemaKeys = new Set(Object.keys(schemaInstance))
      const dataKeys = Object.keys(data)
      const extraKeys = dataKeys.filter((key) => !schemaKeys.has(key))
      if (extraKeys.length > 0) {
        throw new Error(ValidateErrors.additionalFields + extraKeys.join(', '))
      }

      Object.assign(formattedData, data)

      await validateOrReject(formattedData)
    } catch (error) {
      if (Array.isArray(error)) {
        const transformedError = error.map((err) => ({
          property: err.property,
          constraints: err.constraints,
        }))
        throw transformedError
      } else {
        throw error
      }
    }
  }
}
