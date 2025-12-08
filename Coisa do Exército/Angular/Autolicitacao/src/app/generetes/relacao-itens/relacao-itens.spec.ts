import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacaoItens } from './relacao-itens';

describe('RelacaoItens', () => {
  let component: RelacaoItens;
  let fixture: ComponentFixture<RelacaoItens>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelacaoItens]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelacaoItens);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
