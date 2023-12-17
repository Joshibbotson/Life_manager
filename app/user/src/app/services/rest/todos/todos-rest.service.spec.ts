import { TestBed } from '@angular/core/testing'

import { TodosRestService } from './todos-rest.service'

describe('TodosRestService', () => {
  let service: TodosRestService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(TodosRestService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
