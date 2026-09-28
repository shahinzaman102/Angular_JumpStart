import { Component, input, output } from '@angular/core';

@Component({
  selector: 'custom-slider',
  host: {
    '[style.--accent-color]': 'themeColor()', // Defines CSS custom variable --accent-color
    '[style.--fill-percent.%]': 'fillPercentage()', // Defines CSS custom variable --fill-percent with % unit
    '[style.opacity]': 'disabled() ? "0.5" : "1"', // Applies standard CSS opacity directly to host element
  },
  // Use :host {} in CSS to define the structural styles and default variable fallbacks. 
  // Use host: {} in TS when you need TypeScript signals/state to directly drive and 
  //  override those CSS properties (here: --accent-color) at runtime.
  styleUrl: './custom-slider.css',
  templateUrl: './custom-slider.html',
})
export class CustomSlider {
  readonly value = input<number>(0);
  readonly min = input<number>(0);
  readonly max = input<number>(100);
  readonly step = input<number>(5);
  readonly disabled = input<boolean>(false);
  readonly themeColor = input<string>('#1976d2');
  readonly label = input<string>('Value');
  readonly sliderId = input<string>('custom-slider-1');

  readonly valueChange = output<number>();

  protected fillPercentage(): number {
    const minVal = 0;   // Scale against the full 0-100 visual track range
    const maxVal = 100;
    // Math.max(this.value(), this.min()) --> keep Greater than the Lower Bound (here 0)
    // Math.min(Math.max(this.value(), this.min()), this.max()) --> keep Lesser than the Upper Bound (here 100)
    const clamped = Math.min(Math.max(this.value(), this.min()), this.max());
    return ((clamped - minVal) / (maxVal - minVal)) * 100;
    // normally for range(0-100): (clamped/maxVal)*100 is fine.
    // this: ((clamped - minVal) / (maxVal - minVal)) * 100 --> expression is triggers when the range other than (0-100).
  }

  protected adjust(amount: number) {
    if (this.disabled()) return;
    // Math.max(this.value() + amount, this.min()) --> keep Greater than the Lower Bound (here 20)
    // Math.min(Math.max(this.value() + amount, this.min()), this.max()) --> keep Lesser than the Upper Bound (here 80)
    const next = Math.min(Math.max(this.value() + amount, this.min()), this.max());
    this.valueChange.emit(next);
  }

  protected onKeyDown(event: KeyboardEvent) {
    if (this.disabled()) return;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        this.adjust(this.step());
        event.preventDefault();
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        this.adjust(-this.step());
        event.preventDefault();
        break;
    }
  }
}