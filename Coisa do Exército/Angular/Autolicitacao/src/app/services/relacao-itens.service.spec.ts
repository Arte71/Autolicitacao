import { TestBed } from '@angular/core/testing';

import { RelacaoItensService } from './relacao-itens.service';

describe('RelacaoItensService', () => {
  let service: RelacaoItensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelacaoItensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
