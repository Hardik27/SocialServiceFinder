import { TestBed } from '@angular/core/testing';

import { EventregistrationseriveService } from '../eventregistrationservice/eventregistrationserive.service';

describe('EventregistrationseriveService', () => {
  let service: EventregistrationseriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventregistrationseriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
