/**
 * UNIT TESTING
 *
 * Use case: Shared State Service (`SignalStateService`)
 *
 * These tests verify the service in isolation by testing its public API:
 * - Initial signal state
 * - Updating state with `setMessage()`
 * - Clearing state with `clearMessage()`
 *
 * Pattern demonstrated:
 * Arrange → Act → Assert
 */

import { TestBed } from '@angular/core/testing';
import { SignalState } from './signal-state';

describe('SignalStateService', () => {
  let service: SignalState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose the initial shared message', () => {
    // Arrange
    const expectedMessage = 'Initial Shared State';

    // Act
    const actualMessage = service.message();

    // Assert
    expect(actualMessage).toBe(expectedMessage);
  });

  it('should update the shared message when setMessage is called', () => {
    // Arrange
    const newMessage = 'Hello from unit test';

    // Act
    service.setMessage(newMessage);

    // Assert
    expect(service.message()).toBe(newMessage);
  });

  it('should clear the shared message', () => {
    // Arrange
    service.setMessage('Message to clear');

    // Act
    service.clearMessage();

    // Assert
    expect(service.message()).toBe('');
  });
});