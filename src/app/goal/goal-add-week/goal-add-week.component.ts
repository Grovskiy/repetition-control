import {Component, Input, OnInit} from '@angular/core';
import {dayOfGoal} from "../../goals.interface";
import {getDayMonth} from "../../helper/getDayMonth";
import {GoalService} from "../../goal.service";

@Component({
  selector: 'app-goal-add-week',
  templateUrl: './goal-add-week.component.html',
  styleUrls: ['./goal-add-week.component.scss'],
})
export class GoalAddWeekComponent implements OnInit {
  currentDay:any = '';
  startWeek:any = '';

  @Input() goalId: number = 0;
  @Input() goalName: string = '';
  @Input() days: dayOfGoal[] = [];

  constructor(private goalService: GoalService){}

  ngOnInit(): void {
    this.currentDay = this.goalService.getCurrentDate()
  }

  get isNiceDate() {
    return this.startWeek > this.getGoalLastDate(this.goalId);
  }

  updateGoals() {
    this.goalService.updateGoals();
  }

  getGoalLastDate(id:number) {
    return this.goalService.getGoalLastDate(id);
  }

  setDateAddWeek(date:any) {
    const d2 = new Date(date);
    d2.setHours(0,0,0,0);
    this.startWeek = d2;
  }

  setToday() {
    this.startWeek = this.currentDay;
  }

  setTomorrow() {
    const nextDay = new Date(this.currentDay);
    nextDay.setDate(this.currentDay.getDate() + 1);
    this.startWeek = nextDay;
  }

  formattedDateWillDo(value:any) {
    return getDayMonth(value);
  }

  addWeekSelectDay() {
    this.goalService.addWeek(this.goalId, this.startWeek);
    this.startWeek = '';
  }

  isMatchCurrentDay(value: string): boolean {
    const dayFromArray = new Date(value);
    return dayFromArray.getTime() === this.currentDay.getTime();
  }

  isMissedDay(value: string): boolean {
    const dayFromArray = new Date(value);
    return dayFromArray < this.currentDay;
  }

}
