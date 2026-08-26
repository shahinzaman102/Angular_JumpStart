import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PipesUseCases } from './pipes-use-cases';

describe('PipesUseCases', () => {
  let component: PipesUseCases;
  let fixture: ComponentFixture<PipesUseCases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipesUseCases],
    }).compileComponents();

    fixture = TestBed.createComponent(PipesUseCases);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
