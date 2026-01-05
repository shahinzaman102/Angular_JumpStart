import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { JsTsBuiltinFuncs } from './js-ts-builtin-funcs';

describe('JsTsBuiltinFuncs', () => {
    let component: JsTsBuiltinFuncs;
    let fixture: ComponentFixture<JsTsBuiltinFuncs>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [JsTsBuiltinFuncs],
            providers: [provideRouter([])]
        })
        .compileComponents();

        fixture = TestBed.createComponent(JsTsBuiltinFuncs);
        component = fixture.componentInstance;
        // await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
