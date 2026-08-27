import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsUseCases } from './forms-use-cases';

describe('FormsUseCases', () => {
  let component: FormsUseCases;
  let fixture: ComponentFixture<FormsUseCases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsUseCases],
    }).compileComponents();

    fixture = TestBed.createComponent(FormsUseCases);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
