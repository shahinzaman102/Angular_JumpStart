import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RxjsStreams } from './rxjs-streams';

describe('RxjsStreamUseCases', () => {
  let component: RxjsStreams;
  let fixture: ComponentFixture<RxjsStreams>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsStreams],
    }).compileComponents();

    fixture = TestBed.createComponent(RxjsStreams);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
