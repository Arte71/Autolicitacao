import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Faseinterna } from './faseinterna';

describe('Faseinterna', () => {
  let component: Faseinterna;
  let fixture: ComponentFixture<Faseinterna>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Faseinterna]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Faseinterna);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
