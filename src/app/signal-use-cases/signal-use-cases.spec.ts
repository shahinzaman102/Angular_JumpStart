import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalUseCases } from './signal-use-cases';
import { provideRouter } from '@angular/router';

describe('SignalUseCases', () => {
  let component: SignalUseCases;
  let fixture: ComponentFixture<SignalUseCases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalUseCases],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalUseCases);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
