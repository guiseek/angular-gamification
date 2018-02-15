import { MissionService } from './../../src/services/mission.service';

describe('MissionService', () => {

  let service: MissionService;
  beforeEach(() => { service = new MissionService('mission', 10); });

  it('should be instantiated the mission name', () => {
    expect(service.name).toEqual('mission');
  });

  it('should be instantiated the mission points', () => {
    expect(service.points).toEqual(10);
  });

});
