import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { BehaviorSubjectUseCases } from './behavior-subject-use-cases';
import { ChangeStateService } from '../changestate-service';
import { AuthService } from '../auth.service';

describe('BehaviorSubjectUseCases', () => {
    let component: BehaviorSubjectUseCases;
    let fixture: ComponentFixture<BehaviorSubjectUseCases>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BehaviorSubjectUseCases],
            providers: [
                provideHttpClientTesting(), // HttpClient
                provideRouter([]),          // Router (RouterModule replacement)
                ChangeStateService,
                AuthService,
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(BehaviorSubjectUseCases);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
