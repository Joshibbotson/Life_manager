import { AppDataSource } from "../../../data-source";
import { ChoresEntity } from "../../../entities/chores";
import { Users } from "../../../entities/common/users";
import { Request, Response } from "express";
import {Validate} from '../../../../../api/dist/validation/validate'
import {choresSchema} from '../../../../../api/dist/chores/actions'


export class UsersRoutes {
    public static readonly moduleName: string = "ChoresRoutes";

    protected readonly readRoute = this.readHandler();

    protected readHandler() {
        return;
    }

}

// this needs to seperated into MVC architecture

const validate = new Validate()
export async function getChoreById(req, res, next) {
    try {
        const id: number = req.params.id;
        const choreRepository = AppDataSource.manager.getRepository(ChoresEntity);
        const chores = await choreRepository.find({
            where: {
                id: id,
            },
        });

        res.send(chores);
        next();
    } catch (error) {
        console.error("Error fetching chores", error);
        res.status(500).send("Internal Server Error");
    }
}
export async function getChores(req, res, next) {
    console.log("get request");
    try {
        const choreRepository = AppDataSource.manager.getRepository(ChoresEntity);
        const chores = await choreRepository.find();
        console.log("chores: ", chores);

        res.send(chores);
        next();
    } catch (error) {
        console.error("Error fetching chores", error);
        res.status(500).send("Internal Server Error");
    }
}

// TODO:
// Add schema validation for req/res
export async function postChore(req: Request, res: Response) {
    console.log("post");
    try {
        const chore = new ChoresEntity();
        const user = await AppDataSource.getRepository(Users).findOneBy({
            id: 1,
        });
        const payload = req.body;
        chore.name = payload.name;
        chore.description = payload.description;
        chore.assignedTo = payload.assignedTo;
        chore.createdBy = payload.createdBy;
        chore.completed = payload.completed;
        chore.user = user;
        chore.deleted = false;
        chore.createdDate = new Date();
        chore.editedDate = new Date();
        const readOrError = await validate.validateSchema(chore, choresSchema)
        if (readOrError){
            console.log(readOrError)
            await AppDataSource.getRepository(ChoresEntity).save(chore);
            res.status(201).send({ message: "Chore created successfully" });
        } else {
            console.log("failed schema validation")
        }
    } catch (error) {
        console.error("Error posting chores", error);
        res.status(500).send("Internal Server Error");
    }
}

export async function updateChoreById(req, res) {
    try {
        const chore = await AppDataSource.getRepository(ChoresEntity).findOneBy({
            id: req.body.id,
        });
        chore.deleted = true;
        chore;
        await AppDataSource.getRepository(ChoresEntity).save(chore);

        res.status(201).send({ message: "Chore deleted successfully" });
    } catch (error) {
        console.error("Error fetching chores", error);
        res.status(500).send("Internal Server Error");
    }
}
