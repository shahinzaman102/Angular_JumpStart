import { Component, input, output } from '@angular/core';

@Component({
  selector: 'custom-slider',
  host: {
    '[style.--accent-color]': 'themeColor()',
    '[style.--fill-percent.%]': 'fillPercentage()',
    '[style.opacity]': 'disabled() ? "0.5" : "1"',
  },
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
    const clamped = Math.min(Math.max(this.value(), this.min()), this.max());
    return ((clamped - minVal) / (maxVal - minVal)) * 100;
  }

  protected adjust(amount: number) {
    if (this.disabled()) return;
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