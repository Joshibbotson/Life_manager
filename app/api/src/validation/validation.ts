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
      console.log(error)
      //troublesome we really must format errors to be one kind of error message, an error logging class 100% needs creating here
      if (Array.isArray(error)) {
        const transformedError = error.map((err) => ({
          property: err.property,
          constraints: err.constraints,
        }))
        throw transformedError
      } else {
        console.log(error)

        throw error
      }
    }
  }
}
