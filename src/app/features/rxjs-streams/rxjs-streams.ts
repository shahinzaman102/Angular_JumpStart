import { Component, ChangeDetectionStrategy, 
  inject, NgZone, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { Subject, Observable, 
  interval, fromEvent, EMPTY, of } from 'rxjs';
import { debounceTime, switchMap, concatMap, 
  exhaustMap, delay, takeUntil, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-streams',
  templateUrl: './rxjs-streams.html',
  styleUrl: './rxjs-streams.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Do NOT set `OnPush` explicitly cause it's the default in Angular v22+.
  // We've set to provide clarity..
})
export class RxjsStreams {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly ngZone = inject(NgZone);

  // 1. HIGH-FREQUENCY EVENTS: mousemove throttled to ~20/sec via throttleTime(50)
  // NOTE: zoneless app (no zone.js) — runOutsideAngular/ngZone.run are no-ops, not doing anything.
  // This does NOT demonstrate zone-pollution avoidance (no zone exists to pollute).
  // Actual perf win: throttleTime cuts event volume + OnPush/signals keep CD narrow (0.3ms/1 instance).
  // Zone-exclusion pattern kept only as a reference for how this looks in a zone.js app.
  protected readonly mouse = toSignal(
    new Observable<{ x: number; y: number }>(subscriber => {
      if (!this.isBrowser) return;
      return this.ngZone.runOutsideAngular(() =>
        fromEvent<MouseEvent>(document, 'mousemove')
          .pipe(throttleTime(50))
          .subscribe(e => this.ngZone.run(() => subscriber.next({ x: e.clientX, y: e.clientY })))
      );
    }),
    { initialValue: { x: 0, y: 0 } }
  );

  // 2. DEBOUNCING: Delays value propagation until typing pauses (400ms)
  protected readonly searchInput = signal('');
  protected readonly debouncedText = toSignal(
    toObservable(this.searchInput).pipe(debounceTime(400)),
    { initialValue: '' }
  );

  // 3. QUEUED ASYNC (concatMap): Processes operations sequentially without dropping events
  protected readonly queue$ = new Subject<number>();
  protected readonly queueLog = toSignal(
    this.queue$.pipe(concatMap(id => of(`Done #${id}`).pipe(delay(1000)))),
    { initialValue: 'None' }
  );

  // 4. IGNORE DUPLICATE CLICKS (exhaustMap): Drops incoming events until active task completes
  protected readonly exhaust$ = new Subject<void>();
  protected readonly exhaustStatus = toSignal(
    this.exhaust$.pipe(exhaustMap(() => of('Finished!').pipe(delay(2000)))),
    { initialValue: 'Ready' }
  );

  // 5. CONTINUOUS TIME STREAMS: Reactively controls live time emissions via switchMap
  protected readonly streamOn = signal(false);
  protected readonly timer = toSignal(
    toObservable(this.streamOn).pipe(switchMap(on => on ? interval(1000) : EMPTY)),
    { initialValue: 0 }
  );

  // 6. CANCELLATION (takeUntil): Immediately aborts in-flight execution streams
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