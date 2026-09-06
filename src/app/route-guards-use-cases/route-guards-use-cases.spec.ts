import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteGuardsUseCases } from './route-guards-use-cases';

describe('RouteGuardsUseCases', () => {
  let component: RouteGuardsUseCases;
  let fixture: ComponentFixture<RouteGuardsUseCases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteGuardsUseCases],
    }).compileComponents();

    fixture = TestBed.createComponent(RouteGuardsUseCases);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
