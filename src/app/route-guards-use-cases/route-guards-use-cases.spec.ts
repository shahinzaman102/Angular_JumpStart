import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteGuardsUseCases } from './route-guards-use-cases';
import { provideRouter } from '@angular/router';

describe('RouteGuardsUseCases', () => {
  let component: RouteGuardsUseCases;
  let fixture: ComponentFixture<RouteGuardsUseCases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteGuardsUseCases],
      providers: [provideRouter([])], // Resolves ActivatedRoute / RouterLink dependencies
    }).compileComponents();

    fixture = TestBed.createComponent(RouteGuardsUseCases);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
