# angular-gamification
>Improve the interaction of your users with your application using gamification

A simple Gamification library for **Angular v5** apps, written in _TypeScript_, _ES6_ or _ES5_.

The project is based on the [Angular Library Starter](https://github.com/robisim74/angular-library-starter).

Get the [Changelog](https://github.com/guiseek/angular-gamification/blob/master/CHANGELOG.md).

## Contents
* [1 Demo / Live Example](#1)
* [2 Using the library](#2)
* [3 Documentation](#3)
* [4 Testing](#4)

## <a name="1"></a>1 Demo / Live Example
Demo: [Live Example](http://guiseek.js.org/angular-gamification-demo/)

## <a name="2"></a>2 Using the library
### Installing
```Shell
npm i angular-gamification --save 
```
### Loading
#### Using Module configuration (app.module.ts)
```JavaScript
import { GamificationModule } from 'angular-gamification';

const levels = [
  { badge: 'BEGINNER', icon: './../assets/badges/BEGINNER.svg', range: { min: 1, max: 99 } },
  { badge: 'NICE', icon: './../assets/badges/NICE.svg', range: { min: 100, max: 199 } },
  { badge: 'USUAL', icon: './../assets/badges/USUAL.svg', range: { min: 200, max: 299 } },
  { badge: 'CONSTANT', icon: './../assets/badges/CONSTANT.svg', range: { min: 300, max: 399 } },
  { badge: 'VIP', icon: './../assets/badges/VIP.svg', range: { min: 400, max: 499 } },
  { badge: 'NINJA', icon: './../assets/badges/NINJA.svg', range: { min: 500, max: 599 } },
  { badge: 'POWER', icon: './../assets/badges/POWER.svg', range: { min: 600, max: 699 } },
  { badge: 'PARTNER', icon: './../assets/badges/PARTNER.svg', range: { min: 700, max: 799 } },
  { badge: 'LORD', icon: './../assets/badges/LORD.svg', range: { min: 800, max: 899 } },
  { badge: 'KING', icon: './../assets/badges/KING.svg', range: { min: 900, max: 999 } }
];
const GamificationConfig = {
  levels: levels
};
@NgModules({
    ...,
    GamificationModule.forRoot(GamificationConfig)
})
```

#### Using component configuration (app.component.ts)
```JavaScript
import { Component } from '@angular/core';
import { GamificationService } from 'angular-gamification'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  public user;
  public progress;
  public reports;
  public report: Report[];
  constructor(public gamification: GamificationService) {
    this.user = {
      name: 'Gui',
      points: 0,
      level: {}
    };
    this.progress = {
      max: 0,
      value: 0
    };
    this.report;
    this.initGamefication();
  }
  initGamefication() {
    this.reports = this.gamification.getReports();
    this.gamification.addBreakpoint(100, () => {
      console.log('breakpoint 100 callback: ', this.gamification.getPoints());
    });
    this.gamification.addBreakpoint(200, () => {
      console.log('breakpoint 200 callback: ', this.gamification.getPoints());
    });
    this.gamification.addBreakpoint(300, () => {
      console.log('breakpoint 300 callback: ', this.gamification.getPoints());
    });
    this.gamification.addBreakpoint(400, () => {
      console.log('breakpoint 400 callback: ', this.gamification.getPoints());
    });

    this.gamification.addComponent(400, () => {
      console.info('component update callback');
      let points = this.gamification.getPoints();
      this.gamification.getLevelByPoints(points);
      this.user.points = points;
      this.user.level = this.gamification.getLevel();
      this.progress.value = points;
      let report = this.gamification.getReports();
      console.info('component update callback report: ', report);
    }, (maxPoints) => {
      console.log('component 400 start callback');
      this.progress.max = maxPoints;
      this.user.level = this.gamification.getLevel();
    });
    this.gamification.addMission('add', 50, 'User added', () => {
      console.log('add mission start');
    }, (report) => {
      console.log('add mission achieve: ', report, this.gamification.getPoints());
    });
    this.gamification.addMission('save', 30, 'User saved', () => {
      console.log('save mission start');
    }, (report) => {
      console.log('save mission achieve: ', report, this.gamification.getPoints());
    });
    this.gamification.addMission('delete', 10, 'User deleted', () => {
      console.log('delete mission start');
    }, (report) => {
      console.log('delete mission achieve: ', report, this.gamification.getPoints());
    });
  }
}
```

#### Using Component mission (heroes.component.ts)
```JavaScript
import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import { GamificationService } from 'angular-gamification';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(
    private heroService: HeroService,
    public gamification: GamificationService
  ) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
        this.gamification.achieveMission('add');
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe(() => {
      this.gamification.achieveMission('delete');
    });
  }
}
```

## <a name="3"></a>3 Documentation
[Documentation](http://guiseek.js.org/angular-gamification/)

## <a name="4"></a>4 Testing
The following command runs unit & integration tests that are in the `tests` folder (you can change the folder in `spec.bundle.js` file):
```Shell
npm test 
```
It also reports coverage using _Istanbul_.

## License
MIT
