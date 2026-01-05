import { TestBed } from '@angular/core/testing';

import { ChangeStateService } from './changestate-service';

describe('ChangeStateService', () => {
    let service: ChangeStateService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ChangeStateService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
