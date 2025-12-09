import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gerardoc } from './gerardoc';

describe('Gerardoc', () => {
  let component: Gerardoc;
  let fixture: ComponentFixture<Gerardoc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gerardoc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gerardoc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
