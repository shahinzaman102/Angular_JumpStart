import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ObservableUseCases } from './observable-use-cases';

describe('ObservableUseCases', () => {
    let component: ObservableUseCases;
    let fixture: ComponentFixture<ObservableUseCases>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ObservableUseCases],
            providers: [provideRouter([])]
        }).compileComponents();

        fixture = TestBed.createComponent(ObservableUseCases);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
