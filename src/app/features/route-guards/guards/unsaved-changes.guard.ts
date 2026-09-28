import { CanDeactivateFn } from '@angular/router';

export interface HasUnsavedChanges {
    hasUnsavedChanges: () => boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (component) => {
    if (component.hasUnsavedChanges()) {
        return confirm('CanDeactivate Warning: You have unsaved changes. Do you really want to leave?');
    }
    return true;
};