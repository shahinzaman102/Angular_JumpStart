import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AnalyticsWidget } from '../analytics-widget/analytics-widget';

/**
 * LifecycleUseCases (Parent / Host Component)
 * -----------------------------------------------------------------------
 * Purpose: Acts as the CONTROLLER for demonstrating Angular's lifecycle.
 * This component doesn't implement lifecycle hooks itself; instead, it
 * DRIVES the lifecycle events of its child, <app-analytics-widget>, by:
 *
 *  1. Mutating an @Input()-bound signal (`currentMetric`) to trigger
 *     ngOnChanges() / ngDoCheck() in the child.
 *  2. Adding/removing the child from the DOM via `@if` to trigger the
 *     child's full mount phase (constructor -> ngAfterViewInit) and
 *     full teardown phase (ngOnDestroy).
 *
 * OnPush change detection is used here deliberately: it forces state
 * changes to flow through signals/inputs rather than mutation, which
 * keeps the lifecycle firing order predictable for the demo.
 */
@Component({
  selector: 'app-lifecycle-use-cases',
  imports: [AnalyticsWidget],
  templateUrl: './lifecycle-use-cases.html',
  styleUrl: './lifecycle-use-cases.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifecycleUseCases {
  // Controls whether <app-analytics-widget> is present in the DOM.
  // Toggling this is what drives the child's mount (constructor ->
  // ngAfterViewInit) and destroy (ngOnDestroy) lifecycle phases.
  readonly showWidget = signal(true);

  // Passed into the child as [metricData]. Reassigning this (not mutating
  // it in place) creates a new object reference, which is what allows the
  // child's ngOnChanges() to fire on the classical @Input() binding.
  readonly currentMetric = signal({ value: 100 });

  /**
   * Simulates an upstream data update (e.g. a WebSocket tick or polled
   * API response). Triggers the child's ngOnChanges() -> ngDoCheck()
   * -> ngAfterContentChecked() -> ngAfterViewChecked() sequence.
   */
  updateMetric(): void {
    this.currentMetric.set({ value: Math.floor(Math.random() * 500) });
  }

  /**
   * Mounts or unmounts the child component entirely.
   * - Showing it: replays the FULL construction sequence
   *   (constructor -> ngOnChanges -> ngOnInit -> ... -> ngAfterViewInit).
   * - Hiding it: fires ngOnDestroy and runs the DestroyRef cleanup
   *   callback registered inside the child's constructor.
   */
  toggleWidget(): void {
    this.showWidget.update((current) => !current);
  }
}