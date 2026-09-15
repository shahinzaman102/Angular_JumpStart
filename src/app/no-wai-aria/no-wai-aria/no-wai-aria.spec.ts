import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoWaiAria } from './no-wai-aria';

describe('AriaHostBindingsUseCases', () => {
  let component: NoWaiAria;
  let fixture: ComponentFixture<NoWaiAria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoWaiAria],
    }).compileComponents();

    fixture = TestBed.createComponent(NoWaiAria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
