import {Component, Input, OnInit} from '@angular/core';
import {dayOfGoal, StatusDay} from "../../goals.interface";
import {getDayMonth} from "../../helper/getDayMonth";
import {GoalService} from "../../goal.service";
import {arrayWeekday} from "../../helper/arrayWeekday";

@Component({
  selector: 'app-goal-days',
  templateUrl: './goal-days.component.html',
  styleUrls: ['./goal-days.component.scss'],
})
export class GoalDaysComponent implements OnInit {
  currentDay:any = '';
  isShowAllDays:boolean = false;

  @Input() goalId: number = 0;
  @Input() goalName: string = '';
  @Input() days: dayOfGoal[] = [];

  constructor(private goalService: GoalService){}

  get statusDayEmpty() {
    return StatusDay.Empty;
  }
  get statusDayHammock() {
    return StatusDay.Hammock;
  }
  get statusDayDone() {
    return StatusDay.Done;
  }
  get countDone() {
    let initialValue = 0;
    return this.days.reduce((a, b) => b.status === 2 ? a + 1 : a, initialValue);
  }
  get visibleEditButton() {
    return this.goalService.getVisibleEditButton;
  }
  get lastDays() {
    return this.days.slice(-7);
  }
  get formattedDays() {
    return this.isShowAllDays ? this.days : this.lastDays;
  }

  ngOnInit(): void {
    this.currentDay = this.goalService.getCurrentDate()
  }

  updateGoals() {
    this.goalService.updateGoals();
  }

  toggleShowDays() {
    this.isShowAllDays = !this.isShowAllDays;
  }

  formattedDateWillDo(value:any) {
    return getDayMonth(value);
  }

  isMatchCurrentDay(value: string): boolean {
    const dayFromArray = new Date(value).getTime();
    return dayFromArray === this.currentDay;
  }

  isMissedDay(value: string): boolean {
    const dayFromArray = new Date(value);
    return dayFromArray < this.currentDay;
  }

  hasWeekend(timestamp:any) {
    const d = new Date(timestamp).getDay();
    return d == 6 || d == 0;
  }

  dayOfWeek(value: any) {
    return arrayWeekday[new Date(value).getDay()];
  }

  numberOfWeek(value: any) {
    return new Date(value).getDay();
  }

  removeGoalLastWeek() {
    this.goalService.removeGoalLastWeek(this.goalId);
  }

  checkStatus(status:any) {
    console.log(status)
  }

}
