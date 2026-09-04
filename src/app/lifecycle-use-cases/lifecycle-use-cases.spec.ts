import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LifecycleUseCases } from './lifecycle-use-cases';

describe('LifecycleUseCases', () => {
  let component: LifecycleUseCases;
  let fixture: ComponentFixture<LifecycleUseCases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifecycleUseCases],
    }).compileComponents();

    fixture = TestBed.createComponent(LifecycleUseCases);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
