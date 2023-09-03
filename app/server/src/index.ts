import { AppDataSource } from "./data-source";
import { Chores } from "./entities/chores";
import * as restify from "restify";

AppDataSource.initialize();

const server = restify.createServer();
server.pre(restify.plugins.pre.userAgentConnection());
server.use(restify.plugins.bodyParser());

async function getChoreById(req, res, next) {
    try {
        const id: number = req.params.id;
        const choreRepository = AppDataSource.manager.getRepository(Chores);
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

server.get("/chores/:id", getChoreById);

server.listen(8080, function () {
    console.log(`listening at ${server.name}, ${server.url}`);
});
