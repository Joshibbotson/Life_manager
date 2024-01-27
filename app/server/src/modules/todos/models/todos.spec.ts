import { Validate } from "../../../../../api/dist/validation/validation";
import { TodosModel } from "./todos.module";


describe('Todos Model', () => {
  
  const mockTodosModel = jest.fn().mockImplementation(() => {
    return {TodosModel: mockTodosModel}
  })
  
  
  
  beforeEach(() => {
    mockTodosModel.mockClear();
  })
  
  it('delete old todos',  async () => {
    
    const todoModel: TodosModel = new TodosModel(new Validate())
    
  })
})