import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RxjsStreamUseCases } from './rxjs-stream-use-cases';

describe('RxjsStreamUseCases', () => {
  let component: RxjsStreamUseCases;
  let fixture: ComponentFixture<RxjsStreamUseCases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsStreamUseCases],
    }).compileComponents();

    fixture = TestBed.createComponent(RxjsStreamUseCases);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
