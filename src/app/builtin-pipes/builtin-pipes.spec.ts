import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BuiltinPipes } from './builtin-pipes';

describe('BuiltinPipes', () => {
    let component: BuiltinPipes;
    let fixture: ComponentFixture<BuiltinPipes>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BuiltinPipes],
            providers: [
                provideRouter([])
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(BuiltinPipes);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
