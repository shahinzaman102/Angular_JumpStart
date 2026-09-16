import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteGuards } from './route-guards';
import { provideRouter } from '@angular/router';

describe('RouteGuardsUseCases', () => {
  let component: RouteGuards;
  let fixture: ComponentFixture<RouteGuards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteGuards],
      providers: [provideRouter([])], // Resolves ActivatedRoute / RouterLink dependencies
    }).compileComponents();

    fixture = TestBed.createComponent(RouteGuards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
