import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoonsService {

  constructor() { }
  
  private moonsLocal = JSON.parse(<string>localStorage.getItem('moons'));

  private moons:any = this.moonsLocal?.length ? this.moonsLocal : [];

  get getMoons() {
    return this.moons;
  }

  addMoon(text:string, link:string, days:[]) {
    const moon:any = {
      id: this.moons.length ? this.moons[this.moons.length - 1].id + 1 : 1,
      link,
      text,
      waitingDays: days,
      doneDays: [],
    }
    this.moons.push(moon);
    this.updateMoons();
  }
  updateMoons() {
    localStorage.setItem('moons', JSON.stringify(this.moons));
  }
}
