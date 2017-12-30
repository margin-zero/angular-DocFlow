import { TestBed, inject } from '@angular/core/testing';

import { RouterGuardsService } from './router-guards.service';

describe('RouterGuardsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterGuardsService]
    });
  });

  it('should be created', inject([RouterGuardsService], (service: RouterGuardsService) => {
    expect(service).toBeTruthy();
  }));
});
