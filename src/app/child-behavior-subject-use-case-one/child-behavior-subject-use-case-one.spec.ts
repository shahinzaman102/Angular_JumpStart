import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildBehaviorSubjectUseCaseOne } from './child-behavior-subject-use-case-one';

describe('ChildBehaviorSubjectUseCaseOne', () => {
    let component: ChildBehaviorSubjectUseCaseOne;
    let fixture: ComponentFixture<ChildBehaviorSubjectUseCaseOne>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChildBehaviorSubjectUseCaseOne],
        }).compileComponents();

        fixture = TestBed.createComponent(ChildBehaviorSubjectUseCaseOne);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
