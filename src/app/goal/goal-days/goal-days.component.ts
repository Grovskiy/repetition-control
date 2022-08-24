import {Component, Input, OnInit} from '@angular/core';
import {dayOfGoal, StatusDay} from "../../goals.interface";
import {getDayMonth} from "../../helper/getDayMonth";
import {GoalService} from "../../goal.service";

@Component({
  selector: 'app-goal-days',
  templateUrl: './goal-days.component.html',
  styleUrls: ['./goal-days.component.scss'],
})
export class GoalDaysComponent implements OnInit {
  currentDay:any = '';

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

  ngOnInit(): void {
    this.currentDay = this.goalService.getCurrentDate()
  }

  updateGoals() {
    this.goalService.updateGoals();
  }

  formattedDateWillDo(value:any) {
    return getDayMonth(value);
  }

  isMatchCurrentDay(value: string): boolean {
    const dayFromArray = new Date(value);
    return dayFromArray.getTime() === this.currentDay.getTime();
  }

  isMissedDay(value: string): boolean {
    const dayFromArray = new Date(value);
    return dayFromArray < this.currentDay;
  }

  removeGoalLastWeek() {
    this.goalService.removeGoalLastWeek(this.goalId);
  }

  checkStatus(status:any) {
    console.log(status)
  }

}
