import { Injectable } from '@angular/core';

@Injectable()
export class BreakpointService {
  public actionFunc: Function = () => { };
  public pointsThreshold: number;

  constructor(pointsThreshold: number, action?: Function) {
    this.pointsThreshold = pointsThreshold;
    this.actionFunc = action || this.actionFunc;
  }
  public action() {
    this.actionFunc();
  }
}
