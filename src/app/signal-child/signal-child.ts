import { ChangeDetectionStrategy, Component, inject, input, output, model } from '@angular/core';
import { SignalStateService } from '../signal-state';

@Component({
  selector: 'app-signal-child',
  templateUrl: './signal-child.html',
  styleUrl: './signal-child.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SignalChildComponent {
  private readonly stateService = inject(SignalStateService);
  
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