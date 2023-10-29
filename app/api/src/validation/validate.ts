import {  validateOrReject } from "class-validator";

export class Validate {
    async validateSchema(data: any, schema: any): Promise<boolean> {
        const formattedData = new schema();
        formattedData.name = data.name;
        formattedData.description = data.description;
        formattedData.createdBy = data.createdBy;
        formattedData.assignedTo = data.assignedTo;
        formattedData.completed = data.completed
        try {
             await validateOrReject(schema)
             return true
        }catch(error){
            console.log('Caught promise rejection (Validation failure):', error)
            return false
        }
    }
}

