import { inject, TestBed } from '@angular/core/testing';

import { GamificationService } from './../../angular-gamification';

describe('GamificationService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GamificationService,
        // {
        //   provide: GamificationService, useValue: {}, useClass: GamificationService
        // }
      ]
    });
  });

  it('should be breakpoints',
    inject([GamificationService],
      (gamificationService: GamificationService) => {
        gamificationService.addBreakpoint(100);
        expect(gamificationService.getBreakpoints().length).toEqual(1);
      })
  );
  it('should be components',
    inject([GamificationService],
      (gamificationService: GamificationService) => {
        gamificationService.addComponent(1000);
        expect(gamificationService.getComponents().length).toEqual(1);
      })
  );
  it('should be component progress',
    inject([GamificationService],
      (gamificationService: GamificationService) => {
        let component = gamificationService.addComponent(1000);
        gamificationService.addMission('mission', 100);
        gamificationService.achieveMission('mission');
        expect(component.getProgress(gamificationService.getPoints())).toEqual(10);
      })
  );
  it('should be mission',
    inject([GamificationService],
      (gamificationService: GamificationService) => {
        gamificationService.addMission('mission', 10);
        expect(gamificationService.getMissions().length).toEqual(1);
      })
  );
  it('should be missions',
    inject([GamificationService],
      (gamificationService: GamificationService) => {
        gamificationService.addMission('mission', 10);
        gamificationService.addMission('mission2', 10);
        expect(gamificationService.getMissions().length).toEqual(2);
      })
  );
  it('should be mission achieved',
    inject([GamificationService],
      (gamificationService: GamificationService) => {
        gamificationService.addMission('mission', 10);
        gamificationService.achieveMission('mission');
        expect(gamificationService.getPoints()).toEqual(10);
      })
  );

});
