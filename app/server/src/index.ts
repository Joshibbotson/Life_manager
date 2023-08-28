import { error } from "console";
import { AppDataSource } from "./data-source"
import { Chores } from "./entities/chores"


AppDataSource.initialize().then(() => {
    const chore = new Chores()

    chore.createdBy = "Saki Fujimoto";
    chore.assignedTo = "Josh Ibbotson";
    chore.description = "Clean the bathroom on a regular basis"
    chore.name = "Bathroom clean"
    chore.completed = false

    AppDataSource.manager.save(chore)



}).catch((error) => console.log(error))


