import { TestBed } from '@angular/core/testing';

import { MusicplaylistService } from './musicplaylist.service';

describe('MusicplaylistService', () => {
  let service: MusicplaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicplaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
