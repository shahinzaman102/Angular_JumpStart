import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { StudentTable } from './student-table';

describe('StudentTable', () => {
  let component: StudentTable;
  let fixture: ComponentFixture<StudentTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentTable],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total marks correctly', () => {
    const student = component.students[0];
    expect(component.getTotalMarks(student)).toBe(255);
  });

  it('should calculate ranking correctly', () => {
    const student1 = component.students[0];
    const student2 = component.students[1];

    expect(component.getRanking(student1)).toBe(1);
    expect(component.getRanking(student2)).toBe(2);
  });

  it('should calculate classroom ranking correctly', () => {
    const classroom = component.classrooms[0];
    const student1 = classroom.students[0];
    const student2 = classroom.students[1];

    expect(component.getRanking_2(student1, classroom)).toBe(1);
    expect(component.getRanking_2(student2, classroom)).toBe(2);
  });
});
