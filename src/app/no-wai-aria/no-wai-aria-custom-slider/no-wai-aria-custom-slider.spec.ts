import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoWaiAriaCustomSlider } from './no-wai-aria-custom-slider';

describe('CustomSlider', () => {
  let component: NoWaiAriaCustomSlider;
  let fixture: ComponentFixture<NoWaiAriaCustomSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoWaiAriaCustomSlider],
    }).compileComponents();

    fixture = TestBed.createComponent(NoWaiAriaCustomSlider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
