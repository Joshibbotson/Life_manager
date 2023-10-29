import { choresSchema } from "../../../../../api/dist/chores/actions";
import { Validate } from "../../../../../api/dist/validation/validate";
import { AppDataSource } from "../../../data-source";
import { ChoresEntity } from "../../../entities/chores";
import { Users } from "../../../entities/common/users";

export class ChoresModel {
  public static readonly moduleName: string = "ChoresModel";
  public  readonly validate: Validate

  constructor(validate:Validate){
    this.validate = validate
  }

  public async create(request: any, response: any) {
    const post = await this.postChore(request, response)
  }

  public async read(request: any) {
    if (request.params.id){
      return this.getChoreById(request)
    }
        return this.getChores(request)
  }
  
  public async update(request: any) {
        
  }
  
  public async delete(request: any, response: any) {
    return this.deleteChoreById(request, response)
  }

  private async postChore(req: any, res: any) {
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
        const readOrError = await this.validate.validateSchema(chore, choresSchema)
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

  private async  getChores(req?, res?, next?) {
    console.log("get request");
    try {
        const choreRepository = AppDataSource.manager.getRepository(ChoresEntity);
        const chores = await choreRepository.find();
        console.log("chores: ", chores);
      return chores
    } catch (error) {
        console.error("Error fetching chores", error);
        res.status(500).send("Internal Server Error");
    }
  }

  private async  getChoreById(request) {
    try {
      console.log("chore by id req:", request)
        const id: number = request.params.id;
        const choreRepository = AppDataSource.manager.getRepository(ChoresEntity);
        const chore = await choreRepository.find({
            where: {
                id: id,
            },
        });
        console.log(chore)
      return chore
    } catch (error) {
        console.error("Error fetching chores", error);
        request.status(500).send("Internal Server Error");
    }
}


  private async deleteChoreById(req, res) {
    try {
        const chore = await AppDataSource.getRepository(ChoresEntity).findOneBy({
            id: req.body.id,
        });
        chore.deleted = true;
        await AppDataSource.getRepository(ChoresEntity).save(chore);
        res.status(201).send({ message: "Chore deleted successfully" });
        return chore
    } catch (error) {
        console.error("Error fetching chores", error);
        res.status(500).send("Internal Server Error");
    }
}

}

