import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignalChild } from './signal-child';

describe('SignalChild', () => {
  let component: SignalChild;
  let fixture: ComponentFixture<SignalChild>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalChild],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalChild);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
