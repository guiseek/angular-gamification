import { ProgressBarService } from './../../src/services/progress-bar.service';

describe('ProgressBarService', () => {

  let service: ProgressBarService;
  beforeEach(() => { service = new ProgressBarService(1000); });

  it('should be instantiated the progress bar max points', () => {
    expect(service.maxPoints).toEqual(1000);
  });

});
