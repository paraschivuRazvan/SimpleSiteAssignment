import { TestBed } from '@angular/core/testing';

import { CrimeTimelineService } from './crime-timeline.service';

describe('CrimeTimelineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrimeTimelineService = TestBed.get(CrimeTimelineService);
    expect(service).toBeTruthy();
  });
});
