import {restify} from 'restify'

export abstract class RestifyRoutes {
  protected readonly restify: restify;
  protected readonly server = restify.createServer()

  public get(route:string, ...handlers:any){
    this.restify.get(route, ...handlers){

    }

  }
}