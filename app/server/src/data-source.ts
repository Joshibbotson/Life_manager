import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "./entities/users";
import { Chores } from "./entities/chores";
// import {Pool} from "pg"
require("dotenv").config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true, // this is unsafe in production, as it could wipe clean production tables if an entity is changed.
    logging: false,
    entities: [Users, Chores],
    migrations: [], // migrations are going to update your tables correctly
    subscribers: [],
});
