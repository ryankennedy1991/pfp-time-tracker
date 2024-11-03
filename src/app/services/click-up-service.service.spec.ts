import { TestBed } from '@angular/core/testing';

import { ClickUpServiceService } from './click-up-service.service';

describe('ClickUpServiceService', () => {
  let service: ClickUpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClickUpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
