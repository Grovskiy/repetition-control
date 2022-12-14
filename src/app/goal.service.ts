import { Injectable } from '@angular/core';
import { goalsInterface, StatusDay } from "./goals.interface";
import {TWENTY_FOUR_HOURS} from "./helper/TWENTY_FOUR_HOURS";


@Injectable({
  providedIn: 'root'
})

export class GoalService {

  private currentDate: Date = new Date();

  private goalsLocal = JSON.parse(<string>localStorage.getItem('goals'));

  private goals: goalsInterface[] = this.goalsLocal?.length ? this.goalsLocal : [
    {
      id: 0,
      text: 'For example',
      days: this._createStartWeek(),
    }
  ]

  private visibleEditButton:boolean  = false;

  get getVisibleEditButton():boolean {
    return this.visibleEditButton;
  }

  toggleVisibleEditButton() {
    this.visibleEditButton = !this.visibleEditButton;
  }

  getCurrentDate():number {
    this.currentDate.setHours(12,0,0,0);
    return this.currentDate.getTime();
  }

  get getGoals():goalsInterface[] {
    return this.goals;
  }

  getGoalLastDate(id:number):any {
    const foundIndex = this.goals.findIndex(x => x.id == id);
    const daysCount = this.goals[foundIndex].days.length;

    return new Date(this.goals[foundIndex].days[daysCount - 1].dateWillDo);
  }

  addGoal(text:string, chosenDay:string) {
    const goal:any = {
      id: this.goals.length ? this.goals[this.goals.length - 1].id + 1 : 1,
      text: text,
      days: this._createStartWeek(chosenDay)
    }
    this.goals.push(goal);
    this.updateGoals();
  }

  addWeek(id: number, dayStart?: any) {
    const foundIndex = this.goals.findIndex(x => x.id == id);
    const goal = this.goals[foundIndex];
    const lastStrikeDay = goal.days[goal.days.length - 1].day;
    const lastDateWillDo: string = goal.days[goal.days.length - 1].dateWillDo;
    if (dayStart) {
      this.goals[foundIndex].days.push(...this._createStartWeek(dayStart, lastStrikeDay));
    } else {
      this.goals[foundIndex].days.push(...this._createStartWeek(lastDateWillDo, lastStrikeDay));
    }
    this.updateGoals();
  }

  removeGoal(id: number) {
    this.goals = this.goals.filter((goal) => goal.id !== id);
    this.updateGoals();
  }

  removeGoalLastWeek(id: number) {
    const foundIndex = this.goals.findIndex(x => x.id == id);
    const days = this.goals[foundIndex].days;
    this.goals[foundIndex].days.splice(days.length - 7, 7);
    this.updateGoals();
  }

  changeName(id: number, name: string) {
    const foundIndex = this.goals.findIndex(x => x.id == id);
    this.goals[foundIndex].text = name;
    this.updateGoals();
  }

  _createStartWeek(chosenDay: string = '', firstDay: number = 0) {
    const startDays: any[] = [];

    for (let i:number = 1; i < 8; i++) {
      const tomorrow = chosenDay ? new Date(chosenDay) : new Date();
      tomorrow.setHours(12,0,0,0);
      let timestamp = tomorrow.getTime() + (i * TWENTY_FOUR_HOURS) - TWENTY_FOUR_HOURS;
      startDays.push({day: firstDay ? i + firstDay : i, status: StatusDay.Empty, dateWillDo: timestamp })
    }

    return startDays;
  }

  updateGoals() {
    localStorage.setItem('goals', JSON.stringify(this.goals));
  }

}
