import { NgModule, ModuleWithProviders } from '@angular/core';

import { GamificationService } from '../services/gamification.service';

@NgModule({
  declarations: [
    // Pipes.
    // Directives.
    // Components.
  ],
  exports: [
    // Pipes.
    // Directives.
    // Components.
  ]
})
// Consider registering providers using a forRoot() method
// when the module exports components, directives or pipes that require sharing the same providers instances.
// Consider registering providers also using a forChild() method
// when they requires new providers instances or different providers in child modules.
export class GamificationModule {

  /**
   * Use in AppModule: new instance of GamificationService.
   */
  public static forRoot(config: any): ModuleWithProviders {
    return {
      ngModule: GamificationModule,
      providers: [
        GamificationService,
        // {
        //   provide: GamificationService, useValue: config, useClass: GamificationService
        // }
      ]
    };
  }

  /**
   * Use in features modules with lazy loading: new instance of GamificationService.
   */
  public static forChild(): ModuleWithProviders {
    return {
      ngModule: GamificationModule,
      providers: [GamificationService]
    };
  }

}
