import { Injectable } from '@angular/core';
import { Report } from '../interface/report.interface';

@Injectable()
export class MissionService {
  public name: string = 'Mission';
  public points: number = 0;
  public description: string = '';
  private startFn: Function = () => { };
  private achieveFn: Function = () => { };

  constructor(name: string, points: number, description?: string, startFn?: Function, achieveFn?: Function) {
    this.name = name;
    this.points = points;
    this.description = description || this.description;
    this.startFn = startFn || this.startFn;
    this.achieveFn = achieveFn || this.achieveFn;
  }
  public setPoints(points: number) {
    this.points = points;
  }
  public start() {
    this.startFn();
  }
  public achieve(report: Report) {
    this.achieveFn(report);
  }
}
