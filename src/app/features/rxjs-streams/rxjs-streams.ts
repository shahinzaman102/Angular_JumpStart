import { Component, signal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { Subject, interval, EMPTY, of } from 'rxjs';
import { debounceTime, switchMap, concatMap, exhaustMap, delay, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-streams',
  templateUrl: './rxjs-streams.html',
  styleUrl: './rxjs-streams.css',
})
export class RxjsStreams {
  // 1. DEBOUNCING: Delays value propagation until typing pauses (400ms)
  protected readonly searchInput = signal('');
  protected readonly debouncedText = toSignal(
    toObservable(this.searchInput).pipe(debounceTime(400)),
    { initialValue: '' }
  );

  // 2. QUEUED ASYNC (concatMap): Processes operations sequentially without dropping events
  protected readonly queue$ = new Subject<number>();
  protected readonly queueLog = toSignal(
    this.queue$.pipe(concatMap(id => of(`Done #${id}`).pipe(delay(1000)))),
    { initialValue: 'None' }
  );

  // 3. IGNORE DUPLICATE CLICKS (exhaustMap): Drops incoming events until active task completes
  protected readonly exhaust$ = new Subject<void>();
  protected readonly exhaustStatus = toSignal(
    this.exhaust$.pipe(exhaustMap(() => of('Finished!').pipe(delay(2000)))),
    { initialValue: 'Ready' }
  );

  // 4. CONTINUOUS TIME STREAMS: Reactively controls live time emissions via switchMap
  protected readonly streamOn = signal(false);
  protected readonly timer = toSignal(
    toObservable(this.streamOn).pipe(switchMap(on => on ? interval(1000) : EMPTY)),
    { initialValue: 0 }
  );

  // 5. CANCELLATION (takeUntil): Immediately aborts in-flight execution streams
  private readonly cancel$ = new Subject<void>();
  protected readonly cancelStatus = signal('Idle');

  protected startTask(): void {
    this.cancelStatus.set('Running (3s)...');
    of('Data Loaded').pipe(delay(3000), takeUntil(this.cancel$))
      .subscribe(val => this.cancelStatus.set(val));
  }

  protected cancelTask(): void {
    this.cancel$.next();
    this.cancelStatus.set('Cancelled!');
  }
}