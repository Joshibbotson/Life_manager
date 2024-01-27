import { TodosModel } from "../models/todos.module";
import { parentPort } from 'worker_threads'
import { Validate } from "../../../../../api/dist/validation/validation";
import { AppDataSource } from "../../../data-source";


parentPort.on('message', async () => {
  try {
    // Ensure the data source is initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const todosModel = new TodosModel(new Validate());
    await todosModel.deleteCompletedTodos();
    parentPort.postMessage('CompletedTodosDeleted');
  } catch (error) {
    console.log(error);
    parentPort.postMessage('ErrorDeletingCompletedTodos', error);
  }
});

