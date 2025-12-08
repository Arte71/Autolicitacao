import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pesqpreco } from './pesqpreco';

describe('Pesqpreco', () => {
  let component: Pesqpreco;
  let fixture: ComponentFixture<Pesqpreco>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pesqpreco]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pesqpreco);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
