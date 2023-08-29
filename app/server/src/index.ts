import { error } from "console";
import { AppDataSource } from "./data-source"
import { Chores } from "./entities/chores"
import { Users } from "./entities/users";


AppDataSource.initialize().then(() => {
    const user = new Users()

    user.age = 27
    user.name = "Josh Ibbotson"

    AppDataSource.manager.save(user)

    const chore = new Chores()

    chore.createdBy = "Saki Fujimoto";
    chore.assignedTo = "Josh Ibbotson";
    chore.description = "Clean the bathroom on a regular basis"
    chore.name = "Bathroom clean"
    chore.completed = false
    chore.user = user

    AppDataSource.manager.save(chore)



}).catch((error) => console.log(error))


