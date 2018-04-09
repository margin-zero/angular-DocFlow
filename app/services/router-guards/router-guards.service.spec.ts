import { TestBed, inject } from '@angular/core/testing';

import { IsAdminGuard, IsUserGuard, IsAuthenticatedGuard, PendingChangesGuard } from './router-guards.service';

describe('RouterGuardsService-IsAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsAdminGuard]
    });
  });

  it('should be created', inject([IsAdminGuard], (service: IsAdminGuard) => {
    expect(service).toBeTruthy();
  }));
});


describe('RouterGuardsService-IsUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsUserGuard]
    });
  });

  it('should be created', inject([IsUserGuard], (service: IsUserGuard) => {
    expect(service).toBeTruthy();
  }));
});


describe('RouterGuardsService-IsAuthenticatedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsAuthenticatedGuard]
    });
  });

  it('should be created', inject([IsAuthenticatedGuard], (service: IsAuthenticatedGuard) => {
    expect(service).toBeTruthy();
  }));
});



describe('RouterGuardsService-PendingChangesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PendingChangesGuard]
    });
  });

  it('should be created', inject([PendingChangesGuard], (service: PendingChangesGuard) => {
    expect(service).toBeTruthy();
  }));
});
