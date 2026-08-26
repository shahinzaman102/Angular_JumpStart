import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignalChildComponent } from './signal-child';

describe('SignalChild', () => {
  let component: SignalChildComponent;
  let fixture: ComponentFixture<SignalChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalChildComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalChildComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
