import { ChangeDetectionStrategy, Component, inject, input, output, model } from '@angular/core';
import { SignalState } from '../../../core/services/signal-state';

@Component({
  selector: 'app-signal-child',
  templateUrl: './signal-child.html',
  styleUrl: './signal-child.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Do NOT set `OnPush` explicitly cause it's the default in Angular v22+.
  // We've set to provide clarity..
})

export class SignalChild {
  private readonly stateService = inject(SignalState);
  
  // Section 2: Shared State via Service
  protected readonly sharedMessage = this.stateService.message;

  // Section 3: Signal Inputs, Outputs, and Two-Way Model Binding
  readonly parentCounter = input<number>(0);
  readonly childEvent = output<string>();
  readonly childValue = model<string>('Default Child');

  protected clearSharedState(): void {
    this.stateService.clearMessage();
  }

  protected notifyParent(): void {
    this.childEvent.emit(`Child event triggered at ${new Date().toLocaleTimeString()}`);
  }

  protected updateModel(): void {
    this.childValue.set('Updated from Child!');
  }
}