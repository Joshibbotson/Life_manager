import {Validate} from '../../../../../api/dist/validation/validate'
import { server } from "../../..";
import { ChoresController } from "../controller/chores.module";


export class ChoresRoutes {
    public static readonly moduleName: string = "ChoresRoutes";

    private choresController: ChoresController

    constructor(choresController:ChoresController){
        this.choresController = choresController
    }

    private readonly createRoute = this.createHandler(server)
    private readonly readRoute = this.readHandler(server);
    private readonly updateRoute = this.updateHandler(server);
    private readonly deleteRoute = this.deleteHandler(server)

    
    protected createHandler(server: any){
        console.log("createHandler")
        return server.post("/chores/create", async (req, res, next) => {
            try {
                const post = await this.choresController.createRequest(req, res)
                res.json(post)
            } catch(error){
                console .log( error)
                res.status(500).json({ error: 'Internal Server Error' });
            }
        })
    }

    protected readHandler(server: any) {
        console.log("chores readHandler")
        server.get("/chores/read", async (req, res, next) => {
            try {
                const read = await this.choresController.readRequest(req)
                res.json(read)
            } catch(error){
                console .log( error)
                res.status(500).json({ error: 'Internal Server Error' });

            }
        });

         server.get("/chores/read/:id", async (req, res, next) => {
            try {
                const read = await this.choresController.readRequest(req)
                res.json(read)
            } catch(error){
                console .log( error)
                res.status(500).json({ error: 'Internal Server Error' });

            }
        });

    }

    protected updateHandler(server: any) {

    }

    protected deleteHandler(server: any){
        return server.put("/chores/delete/:id", async (req, res, next) => {
            try {
                const deleteRequest = await this.choresController.deleteRequest(req, res)
                res.json(deleteRequest)

            } catch(error) {
                console.log(error)
                res.status(500).json({ error: 'Delete Server Error'})
            }
        })
    }

}


const validate = new Validate()

