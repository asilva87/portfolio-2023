import { TestBed } from '@angular/core/testing';

import { FormatStringService } from './format-string.service';

describe('FormatStringService', () => {
  let service: FormatStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
