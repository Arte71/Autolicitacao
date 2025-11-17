import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Licparticipativas } from './licparticipativas';

describe('Licparticipativas', () => {
  let component: Licparticipativas;
  let fixture: ComponentFixture<Licparticipativas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Licparticipativas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Licparticipativas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
