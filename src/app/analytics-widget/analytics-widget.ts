import {
  Component,
  input,
  viewChild,
  contentChild,
  ElementRef,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges,
  afterNextRender,
  afterEveryRender,
  ChangeDetectionStrategy,
  effect,
  DestroyRef,
  inject,
  signal
} from '@angular/core';

/**
 * AnalyticsWidgetComponent
 * -----------------------------------------------------------------------
 * Learning-project reference implementation exercising every Angular
 * lifecycle hook in execution order (see console log prefixes [1]..[11]).
 *
 * Three distinct "scopes" are tracked throughout this component, since
 * mixing them up is the most common source of lifecycle confusion:
 *
 *   - OWN INPUT SCOPE     -> widgetTitle, metricData (set by the parent)
 *   - PROJECTED SCOPE     -> projectedHeader (<ng-content>, owned by the
 *                            PARENT's template, merely rendered here)
 *   - OWN VIEW SCOPE      -> chartContainer, internalCounter (this
 *                            component's own template & local state)
 *
 * Execution order for a single mount -> update -> destroy cycle:
 *   constructor -> ngOnChanges -> ngOnInit -> ngDoCheck
 *   -> ngAfterContentInit -> ngAfterContentChecked
 *   -> ngAfterViewInit -> ngAfterViewChecked
 *   -> afterNextRender (once) / afterEveryRender (every cycle)
 *   -> ngOnDestroy
 */
@Component({
  selector: 'app-analytics-widget',
  templateUrl: './analytics-widget.html',
  styleUrl: './analytics-widget.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsWidgetComponent implements
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {

  // --- OWN INPUT SCOPE ---------------------------------------------------
  // Populated by Angular AFTER the constructor runs but BEFORE ngOnInit.
  // Undefined/default inside the constructor - never read them there.
  readonly widgetTitle = input<string>('Default Widget');
  readonly metricData = input<{ value: number }>();

  // --- OWN VIEW SCOPE ------------------------------------------------------
  // Query into THIS component's own template (analytics-widget.html).
  // Only resolved once Angular has mounted this component's view, i.e.
  // by ngAfterViewInit() - reading it earlier returns undefined.
  readonly chartContainer = viewChild<ElementRef<HTMLDivElement>>('chartContainer');

  // --- PROJECTED SCOPE -----------------------------------------------------
  // Query into content the PARENT projected via <ng-content>
  // (#projectedHeader lives in lifecycle-use-cases.html, not here).
  // Resolved by ngAfterContentInit() - one phase earlier than viewChild,
  // because content projection is processed before this component's own
  // view is fully checked.
  readonly projectedHeader = contentChild<ElementRef<HTMLSpanElement>>('projectedHeader');

  // --- OWN VIEW SCOPE (local state) -----------------------------------------
  // Purely internal state, unrelated to inputs. Manually tracked inside
  // ngDoCheck() below since it isn't part of an @Input()/signal-input
  // binding that Angular checks automatically.
  readonly internalCounter = signal(0);
  private previousMetricValue: number | null = null;

  private readonly destroyRef = inject(DestroyRef);

  /** Local UI action - mutates only this component's own view scope. */
  incrementLocalCounter(): void {
    this.internalCounter.update(c => c + 1);
  }

  /**
   * [1] CONSTRUCTOR - Instantiation & Injection Context
   * ------------------------------------------------------------------
   * Runs the moment `new AnalyticsWidgetComponent()` happens. At this
   * point the component exists only in memory:
   *   - @Input()/input() values are NOT yet populated.
   *   - The template/DOM does not exist yet (chartContainer,
   *     projectedHeader are both unresolved).
   *
   * This is the ONLY place `effect()`, `afterNextRender()`, and
   * `afterEveryRender()` may be registered directly, since they require
   * an active Injection Context. Keep this method limited to DI wiring
   * and hook/callback registration - never fetch data or touch the DOM
   * here.
   */
  constructor() {
    console.log('[1. CONSTRUCTOR] Component instance created in memory.');

    // Modern cleanup pattern: register teardown logic via DestroyRef
    // instead of implementing OnDestroy for this specific concern.
    // Runs once, right before ngOnDestroy fires.
    const intervalId = setInterval(() => { }, 10000);
    this.destroyRef.onDestroy(() => {
      console.log('[DestroyRef Callback] Cleaning up background interval timer.');
      clearInterval(intervalId);
    });

    // Signal effects re-run automatically whenever a signal they read
    // (metricData) changes, independent of the ngOnChanges/ngDoCheck
    // cycle. Scheduled asynchronously during change detection.
    effect(() => {
      console.log(`[Signal Effect] Input signal updated: metricData = ${this.metricData()?.value}`);
    });

    // Post-paint render hooks: registered here (Injection Context),
    // but their CALLBACKS execute much later, after the browser has
    // physically painted - see numbered log order [9] and [10] below.
    afterNextRender(() => {
      console.log('[9. afterNextRender] DOM is fully stable after initial render.');
    });

    afterEveryRender(() => {
      console.log('[10. afterEveryRender] DOM rendered/re-painted across component view tree.');
    });
  }

  // --- LIFECYCLE HOOKS: CLASSIFIED BY SCOPE AND PHASE ---------------------

  /**
   * [2] ngOnChanges - Input Binding Tracking
   * ------------------------------------------------------------------
   * Fires only for CLASSICAL @Input()-style bindings, before ngOnInit
   * on first change and before ngDoCheck on every subsequent change.
   * Signal inputs (input()) do NOT trigger this hook on their own -
   * they're read reactively wherever they're used (e.g. inside the
   * `effect()` above, or directly in the template).
   */
  ngOnChanges(changes: SimpleChanges): void {
    console.log('[2. ngOnChanges] Classical @Input bindings changed:', changes);
  }

  /**
   * [3] ngOnInit - Component Initialization
   * ------------------------------------------------------------------
   * Fires exactly once, after the FIRST ngOnChanges. Inputs are
   * guaranteed to be populated here - this is the correct place for
   * one-time setup that depends on input values (initial API calls,
   * form initialization, subscription setup). The DOM/view is still
   * NOT guaranteed to be ready.
   */
  ngOnInit(): void {
    console.log(`[3. ngOnInit] Initialization complete. Inputs ready: "${this.widgetTitle()}"`);
  }

  /**
   * [4] ngDoCheck - Custom Change Detection (OWN INPUT/STATE SCOPE)
   * ------------------------------------------------------------------
   * Runs on EVERY change detection cycle, regardless of whether any
   * @Input() actually changed. Used here to manually detect a value
   * change inside `metricData` that a simple reference check might
   * otherwise catch too late (or to demonstrate manual diffing).
   *
   * Scope: this component's OWN inputs/local state only - never touch
   * projected content or view-child DOM nodes here.
   * Caution: keep this cheap; it runs constantly.
   */
  ngDoCheck(): void {
    console.log('[4. ngDoCheck] Scope Check: Verifying THIS component\'s own state & direct bindings.');

    const currentVal = this.metricData()?.value ?? null;
    if (currentVal !== this.previousMetricValue) {
      console.log(`   └─ [ngDoCheck Detail] Detected shift in metricData: ${this.previousMetricValue} ➔ ${currentVal}`);
      this.previousMetricValue = currentVal;
    }
  }

  /**
   * [5] ngAfterContentInit - Projected Content Ready (PARENT-OWNED SCOPE)
   * ------------------------------------------------------------------
   * Fires ONCE, after content projected by the PARENT via <ng-content>
   * has been initialized. This is the first point at which
   * `contentChild('projectedHeader')` resolves to a real value -
   * reading it any earlier (e.g. in the constructor or ngOnInit)
   * returns undefined.
   */
  ngAfterContentInit(): void {
    console.log('[5. ngAfterContentInit] Projected Scope Ready: <ng-content> elements are initialized.');
    console.log('   └─ Found projected header element:', this.projectedHeader()?.nativeElement.innerText);
  }

  /**
   * [6] ngAfterContentChecked - Projected Content Re-verified
   * ------------------------------------------------------------------
   * Fires after every change detection pass that checks projected
   * content specifically. Runs frequently - avoid heavy logic here.
   */
  ngAfterContentChecked(): void {
    console.log('[6. ngAfterContentChecked] Scope Check: Re-checking projected content (<ng-content>) for updates.');
  }

  /**
   * [7] ngAfterViewInit - Own View Mounted (OWN VIEW SCOPE)
   * ------------------------------------------------------------------
   * Fires ONCE, after THIS component's own template, child components,
   * and `viewChild()` queries have been mounted in memory. This is the
   * first safe point to read `chartContainer()`.
   *
   * Note: nodes exist in the DOM tree here but the browser may not have
   * physically painted them yet - for pixel-accurate layout reads or
   * 3rd-party UI library init, prefer `afterNextRender()` instead.
   * Also avoid synchronous state writes here that affect template
   * bindings (risks ExpressionChangedAfterItHasBeenCheckedError).
   */
  ngAfterViewInit(): void {
    console.log('[7. ngAfterViewInit] Own View Scope Ready: Internal HTML & @viewChild elements mounted.');
    console.log('   └─ Found local container element:', this.chartContainer()?.nativeElement.className);
  }

  /**
   * [8] ngAfterViewChecked - Own View Re-verified
   * ------------------------------------------------------------------
   * Fires after every change detection pass checks this component's
   * own rendered view and its child views. Runs frequently - avoid
   * state mutation here for the same reason as ngAfterViewInit.
   */
  ngAfterViewChecked(): void {
    console.log('[8. ngAfterViewChecked] Scope Check: Re-checking THIS component\'s rendered view & child views.');
  }

  /**
   * [11] ngOnDestroy - Unmount / Teardown
   * ------------------------------------------------------------------
   * Fires once, immediately before Angular removes this component
   * instance from the DOM and memory. Use this (or DestroyRef.onDestroy,
   * as demonstrated in the constructor) to unsubscribe from manual
   * Observables, clear timers, and detach native listeners.
   */
  ngOnDestroy(): void {
    console.log('[11. ngOnDestroy] Component instance is being unmounted and destroyed.');
  }
}