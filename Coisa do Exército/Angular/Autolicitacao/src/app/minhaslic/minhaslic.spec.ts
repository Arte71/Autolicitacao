import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Minhaslic } from './minhaslic';

describe('Minhaslic', () => {
  let component: Minhaslic;
  let fixture: ComponentFixture<Minhaslic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Minhaslic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Minhaslic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
