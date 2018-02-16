import { inject, TestBed } from '@angular/core/testing';

import { GamificationModule ,GamificationService } from './../../angular-gamification';

describe('GamificationService', () => {

  let service: GamificationService;
  beforeEach(() => { service = new GamificationService({}); });
  it('should be components', () => {
    service.addComponent(1000);
    expect(service.getComponents().length).toEqual(1);
  });
  it('should be component progress', () => {
    let component = service.addComponent(1000);
    service.addMission('mission', 100);
    service.achieveMission('mission');
    expect(component.getProgress(service.getPoints())).toEqual(10);
  });
  it('should be mission', () => {
    service.addMission('mission', 10);
    expect(service.getMissions().length).toEqual(1);
  });
  it('should be missions', () => {
    service.addMission('mission', 10);
    service.addMission('mission2', 10);
    expect(service.getMissions().length).toEqual(2);
  });
  it('should be mission achieved', () => {
    service.addMission('mission', 10);
    service.achieveMission('mission');
    expect(service.getPoints()).toEqual(10);
  });
});
