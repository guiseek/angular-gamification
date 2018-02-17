import { Injectable, Inject } from '@angular/core';
import { MissionService } from './mission.service';
import { ProgressBarService } from './progress-bar.service';
import { BreakpointService } from './breakpoint.service';
import { ReportService } from './report.service';
import { Level } from '../interface/level.interface';
import { Report } from '../interface/report.interface';

@Injectable()
export class GamificationService {
  public points: number = 0;
  public levels: Array<Level> = [];
  public level: Level;
  public breakpoints = Array<BreakpointService>();
  public missions = Array<MissionService>();
  public components = Array<ProgressBarService>();
  public reportService = new ReportService();
  constructor(@Inject('config') private config: any) {
    this.levels = config.levels || this.levels;
    this.level = config.level || this.levels[0];
    this.points = config.points || this.points;
  }
  addComponent(points: number, updateFn?: Function, startFn?: Function) {
    const component = new ProgressBarService(points, updateFn, startFn);
    this.components.push(component);
    component.start();
    return component;
  }
  getComponents() {
    return this.components;
  }
  addMission(name: string, points: number, description?: string, startFn?: Function, achieveFn?: Function) {
    const mission = new MissionService(name, points, description, startFn, achieveFn);
    this.missions.push(mission);
    mission.start();
    return mission.name;
  }
  getMissions() {
    return this.missions;
  }
  addBreakpoint(points: number, actionFn?: Function): void {
    const breakpoint = new BreakpointService(points, actionFn);
    this.breakpoints.push(breakpoint);
  }
  getBreakpoints() {
    return this.breakpoints;
  }
  addPoints(points: number): void {
    this.points += points;
    this.breakpoints.forEach((breakpoint, index) => {
      if (((this.points - points) < this.breakpoints[index].pointsThreshold) && (this.breakpoints[index].pointsThreshold <= (this.points))) {
        this.breakpoints[index].action();
      }
    });
    this.components.forEach((component, index) => {
      this.components[index].update(points);
    });
  }
  getPoints(): number {
    return this.points;
  }
  setPoints(points: number): void {
    this.points = points;
  }
  setLevels(levels: Level[]): void {
    this.levels = levels;
  }
  getLevels(): Level[] {
    return this.levels;
  }
  addLevel(level: Level): void {
    this.levels.push(level);
  }
  setLevel(level: Level): void {
    this.level = level;
  }
  getLevel(): Level {
    return this.level;
  }
  getLevelByPoints(points: number) {
    return this.getLevels().filter(level => {
      if (level.range) {
        return (level.range.min <= points) && (level.range.max >= points);
      }
    }, this.setLevel)[0];
  }
  setReports(reports: Report[]) {
    this.reportService.set(reports);
  }
  getReports(): Report[] {
    return this.reportService.get();
  }
  clearReport(): void {
    this.reportService.clear();
  }
  achieveMission(name: string): void {
    this.missions.map((mission, index) => {
      if (mission.name === name) {
        this.addPoints(mission.points);
        let report = this.reportService.add({
          description: mission.description,
          points: mission.points
        });
        mission.achieve(report);
      }
    });
  }
}
