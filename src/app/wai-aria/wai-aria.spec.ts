import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaiAria } from './wai-aria';

describe('AriaHostBindingsUseCases', () => {
  let component: WaiAria;
  let fixture: ComponentFixture<WaiAria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaiAria],
    }).compileComponents();

    fixture = TestBed.createComponent(WaiAria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
