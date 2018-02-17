import { Injectable } from '@angular/core';
import { Report } from '../interface/report.interface';

@Injectable()
export class ReportService {
  reports: Array<Report> = [];

  set(reports: Report[]): void {
    this.reports = reports;
  }
  add(report: Report): Report {
    this.reports.push(report);
    return report;
  }
  get(): Report[] {
    return this.reports as Report[];
  }
  clear(): void {
    this.reports = [];
  }
}
