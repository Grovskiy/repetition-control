import { Component } from '@angular/core';
import {GoalService} from "./goal.service";
import {getDayMonth} from "./helper/getDayMonth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  presentDay: string = '';

  constructor(private goalService: GoalService){}

  ngOnInit(){
    this.presentDay = getDayMonth(this.goalService.getCurrentDate())
  }

  get items() {
    return this.goalService.getGoals;
  }

  toggleVisibleEditButton() {
    this.goalService.toggleVisibleEditButton();
  }
}
