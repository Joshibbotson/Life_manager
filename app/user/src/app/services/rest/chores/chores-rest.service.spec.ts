import { TestBed } from '@angular/core/testing';

import { ChoresRestService } from './chores-rest.service';

describe('ChoresRestService', () => {
  let service: ChoresRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChoresRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
