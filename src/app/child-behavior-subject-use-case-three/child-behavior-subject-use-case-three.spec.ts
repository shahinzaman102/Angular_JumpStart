import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildBehaviorSubjectUseCaseThree } from './child-behavior-subject-use-case-three';

describe('ChildBehaviorSubjectUseCaseThree', () => {
    let component: ChildBehaviorSubjectUseCaseThree;
    let fixture: ComponentFixture<ChildBehaviorSubjectUseCaseThree>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChildBehaviorSubjectUseCaseThree]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ChildBehaviorSubjectUseCaseThree);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
