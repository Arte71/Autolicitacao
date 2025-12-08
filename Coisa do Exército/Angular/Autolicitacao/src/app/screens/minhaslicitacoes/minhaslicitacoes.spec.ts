import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Minhaslicitacoes } from './minhaslicitacoes';

describe('Minhaslicitacoes', () => {
  let component: Minhaslicitacoes;
  let fixture: ComponentFixture<Minhaslicitacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Minhaslicitacoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Minhaslicitacoes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
