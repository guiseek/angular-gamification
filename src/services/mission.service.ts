import { Injectable } from '@angular/core';

@Injectable()
export class MissionService {
  public name: string = 'Mission';
  public points: number = 0;
  private startFn: Function = () => { };
  private achieveFn: Function = () => { };

  constructor(name: string, points: number, startFn?: Function, achieveFn?: Function) {
    this.name = name;
    this.points = points;
    this.startFn = startFn || this.startFn;
    this.achieveFn = achieveFn || this.achieveFn;
  }
  public setPoints(points: number) {
    this.points = points;
  }
  public start() {
    this.startFn();
  }
  public achieve() {
    this.achieveFn();
  }
}
