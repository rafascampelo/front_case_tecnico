import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialScreen } from './initial-screen';

describe('InitialScreen', () => {
  let component: InitialScreen;
  let fixture: ComponentFixture<InitialScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitialScreen],
    }).compileComponents();

    fixture = TestBed.createComponent(InitialScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
