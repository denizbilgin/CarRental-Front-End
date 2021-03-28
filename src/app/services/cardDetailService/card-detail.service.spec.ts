import { TestBed } from '@angular/core/testing';

import { CardDetailService } from './card-detail.service';

describe('CardDetailService', () => {
  let service: CardDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
