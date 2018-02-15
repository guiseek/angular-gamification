import { BreakpointService } from './../../src/services/breakpoint.service';

describe('BreakpointService', () => {

  let service: BreakpointService;
  beforeEach(() => { service = new BreakpointService(100); });

  it('should be instantiated the breakpoint', () => {
    expect(service.pointsThreshold).toEqual(100);
  });

});
