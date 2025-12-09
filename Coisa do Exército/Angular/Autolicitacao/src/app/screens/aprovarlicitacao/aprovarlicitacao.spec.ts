import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aprovarlicitacao } from './aprovarlicitacao';

describe('Aprovarlicitacao', () => {
  let component: Aprovarlicitacao;
  let fixture: ComponentFixture<Aprovarlicitacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aprovarlicitacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Aprovarlicitacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
