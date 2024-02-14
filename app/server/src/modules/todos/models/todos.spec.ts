import { Validate } from "../../../../../api/dist/validation/validation";
import { TodosModel } from "./todos.module";

// const Validate = require('../../../../../api/dist/validation/validation')
// const TodosModel = require('./todos.module')

jest.mock('./todos.module')

describe('Todos Model', () => {
  let mockTodosModel;
  let validate;

  beforeEach(() => {
    jest.clearAllMocks()

    validate = new Validate();
    mockTodosModel = new TodosModel(validate);

    // Mock out the methods
    mockTodosModel.createTodo = jest.fn()
    mockTodosModel.getTodos = jest.fn()
    mockTodosModel.getTodoById = jest.fn()
    mockTodosModel.deleteTodoById = jest.fn()
    mockTodosModel.updateTodoById = jest.fn()
    mockTodosModel.deleteCompletedTodos = jest.fn()

  })
  
  it('delete old todos',  async () => {
    mockTodosModel.deleteCompletedTodos()

    expect(mockTodosModel.deleteCompletedTodos()).toHaveBeenCalled()
    expect
    
  })
})