import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildBehaviorSubjectUseCaseTwo } from './child-behavior-subject-use-case-two';

describe('ChildBehaviorSubjectUseCaseTwo', () => {
    let component: ChildBehaviorSubjectUseCaseTwo;
    let fixture: ComponentFixture<ChildBehaviorSubjectUseCaseTwo>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChildBehaviorSubjectUseCaseTwo]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ChildBehaviorSubjectUseCaseTwo);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
