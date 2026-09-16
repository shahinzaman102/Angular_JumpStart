import { TestBed } from '@angular/core/testing';
import { ReportExport } from './report-export';

describe('ReportExport', () => {
  let service: ReportExport;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportExport);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
