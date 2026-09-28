/**
 * INTEGRATION TESTING
 *
 * Use case: Component Communication (`input`, `output`, `model`)
 *
 * These tests verify multiple Angular pieces working together:
 * - Child `output()` → Parent event handler → Parent DOM update
 * - Child `model()` → Parent `[(childValue)]` binding → Parent DOM update
 *
 * The tests interact with the rendered component DOM rather than testing
 * the child/parent methods in isolation.
 *
 * Pattern demonstrated:
 * Arrange → Act → Assert
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

import { Signals } from './signals';

describe('SignalUseCases', () => {
  let fixture: ComponentFixture<Signals>;
  let component: Signals;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Signals],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Signals);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive an event from the child', () => {
    // Arrange
    const notifyButton = fixture.debugElement.query(
      // Find an element in the component's DOM whose data-testid attribute is "notify-parent" using a CSS selector.
      By.css('[data-testid="notify-parent"]')
      // Component Communication APIs : "src/app/signal-child/signal-child.html"
    );

    // Act
    notifyButton.triggerEventHandler('click');
    fixture.detectChanges();

    // Assert
    const notification = fixture.debugElement.query(
      By.css('p em')
    );

    const element = notification.nativeElement as HTMLElement;

    expect(element.textContent).toContain(
      'Child event triggered at'
    );
  });

  it('should update the parent model when the child changes the value', () => {
    // Arrange
    const updateModelButton = fixture.debugElement.query(
      By.css('[data-testid="update-model"]')
      // Component Communication APIs : "src/app/signal-child/signal-child.html"
    );

    // Act
    updateModelButton.triggerEventHandler('click');
    fixture.detectChanges();

    // Assert
    const parentInput = fixture.debugElement.query(
      By.css('[data-testid="parent-model-input"]')
      // COMPONENT COMMUNICATION : "src/app/signal-use-cases/signal-use-cases.html"
    );

    const input = parentInput.nativeElement as HTMLInputElement;

    expect(input.value).toBe('Updated from Child!');
  });
});