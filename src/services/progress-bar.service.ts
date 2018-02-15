import { Injectable } from '@angular/core';

@Injectable()
export class ProgressBarService {
  public maxPoints: number = 0;
  public isFull: boolean;
  private updateFn: Function = () => { };
  private startFn: Function = () => { };

  constructor(maxPoints: number, updateFn?: Function, startFn?: Function) {
    this.maxPoints = maxPoints || this.maxPoints;
    this.updateFn = updateFn || this.updateFn;
    this.startFn = startFn || this.startFn;
    this.isFull = false;
    return this;
  }
  public update(points: number) {
    if (!this.isFull) {
      this.updateFn();

      if (this.maxPoints <= points) {
        this.isFull = true;
      }
    }
  }
  public start() {
    this.startFn();
  }
  public getProgress(points: number) {
    return Math.min(Math.max(Math.ceil(100 * points / this.maxPoints), 0), 100)
  }
}
