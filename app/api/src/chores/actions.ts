import { IsString, IsBoolean } from "class-validator";

export class choresSchema {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    createdBy: string;

    @IsString()
    assignedTo: string;

    @IsBoolean()
    completed: boolean;
}