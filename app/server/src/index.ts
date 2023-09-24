import express from "express";

import cors from "cors";
import {
    getChores,
    getChoreById,
    postChore,
} from "./modules/chores/routes/chores.module";

export const port = 8080;
export const server = express();

server.use(express.json());
server.use(
    cors({
        origin: "*",
    })
);

server.listen(port, function () {
    console.log(`listening at ${port}`);
});

server.get("/chores/read", getChores);
server.get("/chores/read/:id", getChoreById);
server.post("/chores/create", postChore);
