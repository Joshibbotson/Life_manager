import { Worker } from "worker_threads";
import cron from 'node-cron'

export class TodosJob  {
  public static readonly moduleName: string = 'todosWorker'

  constructor(){
    this.cleanUpTodosJob()
    console.log("clean up")
  }

  private cleanUpTodosJob(){
    cron.schedule('0 0 * * *', () => {
      console.log("Running cleanup todos job")
      const worker = new Worker('./src/modules/todos/workers/todos.module.ts');
      worker.on('message', (message) => {
        console.log(message);
      });

      worker.on('error', (error) => {
        console.error('Worker error:', error);
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          console.error(`Worker stopped with exit code ${code}`);
        }
      });

      worker.postMessage('start');
    });
    }
  }
