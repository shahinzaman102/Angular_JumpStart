import { Service, signal } from '@angular/core';

@Service()
export class SignalStateService {
    // Private writable signal
    private readonly _message = signal('Initial Shared State');
    // Exposed read-only signal
    readonly message = this._message.asReadonly();
    // Public state modifier
    setMessage(value: string): void {
        this._message.set(value);
    }
    clearMessage(): void {
        this._message.set('');
    }
}