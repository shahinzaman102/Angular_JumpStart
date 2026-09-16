import { Component, signal } from '@angular/core';
import { NoWaiAriaCustomSlider } from '../no-wai-aria-custom-slider/no-wai-aria-custom-slider';

@Component({
  selector: 'app-no-wai-aria',
  imports: [NoWaiAriaCustomSlider],
  styleUrl: './no-wai-aria.css',
  templateUrl: './no-wai-aria.html',
})
export class NoWaiAria {
  protected readonly volume = signal(50);
  protected readonly isControlDisabled = signal(false);

  protected readonly themeColor = signal('#1976d2');

  protected readonly disabledStatusMessage = signal('');
  protected readonly themeStatusMessage = signal('');

  toggleDisabled() {
    const nextState = !this.isControlDisabled();
    this.isControlDisabled.set(nextState);
    this.disabledStatusMessage.set(`Media Volume slider is now ${nextState ? 'Disabled' : 'Enabled'}.`);
  }

  toggleTheme() {
    if (this.isControlDisabled()) return;

    const nextColor = this.themeColor() === '#1976d2' ? '#c2185b' : '#1976d2';
    this.themeColor.set(nextColor);
    this.themeStatusMessage.set(`Theme color is set to ${nextColor === '#1976d2' ? 'Blue' : 'Pink'}.`);
  }
}