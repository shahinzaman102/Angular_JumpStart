import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ObservableWithOperators } from './observable-with-operators';

describe('ObservableWithOperators', () => {
    let component: ObservableWithOperators;
    let fixture: ComponentFixture<ObservableWithOperators>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ObservableWithOperators],
            providers: [
                provideRouter([])  // <-- provide router for RouterModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ObservableWithOperators);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
