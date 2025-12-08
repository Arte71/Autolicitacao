import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Preencher } from './preencher';

describe('Preencher', () => {
  let component: Preencher;
  let fixture: ComponentFixture<Preencher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Preencher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Preencher);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
