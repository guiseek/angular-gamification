import { Injectable } from '@angular/core';
import { MissionService } from './mission.service';
import { ProgressBarService } from './progress-bar.service';
import { BreakpointService } from './breakpoint.service';
import { Level } from '../interface/level.interface';

@Injectable()
export class GamificationService {
  public points: number = 0;
  public levels: Array<Level>;
  public level: Level;
  public breakpoints = Array<BreakpointService>();
  public missions = Array<MissionService>();
  public components = Array<ProgressBarService>();
  constructor() {
    this.levels = [];
    this.level = this.levels[0];
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
  addMission(name: string, points: number, startFn?: Function, achieveFn?: Function) {
    const mission = new MissionService(name, points, startFn, achieveFn);
    this.missions.push(mission);
    mission.start();
    return mission.name;
  }
  getMissions() {
    return this.missions;
  }
  addBreakpoint(points: number, actionFn?: Function) {
    const breakpoint = new BreakpointService(points, actionFn);
    this.breakpoints.push(breakpoint);
  }
  getBreakpoints() {
    return this.breakpoints;
  }
  addPoints(points: number) {
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
  getPoints() {
    return this.points;
  }
  setPoints(points: number) {
    this.points = points;
  }
  setLevels(levels: Level[]) {
    this.levels = levels;
  }
  getLevels() {
    return this.levels;
  }
  addLevel(level: Level) {
    this.levels.push(level);
  }
  setLevel(level: Level) {
    this.level = level;
  }
  getLevel() {
    return this.level;
  }
  getLevelByPoints(points: number) {
    return this.getLevels().map(level => level).filter(level => {
      return (level.range.min <= points) && (level.range.max >= points);
    }, this.setLevel)[0];
  }
  achieveMission(name: string) {
    return this.missions.map((mission, index) => {
      if (mission.name === name) {
        this.addPoints(mission.points);
        mission.achieve();
      }
    });
  }
}
