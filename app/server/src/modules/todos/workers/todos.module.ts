import { TodosModel } from "../models/todos.module";
import { parentPort } from 'worker_threads'
import { Validate } from "../../../../../api/dist/validation/validation";
import { AppDataSource } from "../../../data-source";


parentPort.on('message', async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const todosModel = new TodosModel(new Validate());
    await todosModel.deleteCompletedTodos();
    parentPort.postMessage('CompletedTodosDeleted');
  } catch (error) {
    parentPort.postMessage('ErrorDeletingCompletedTodos', error);
  }
});

