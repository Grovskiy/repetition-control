import {Component} from '@angular/core';
import {GoalService} from "../goal.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  chosenDay:any = new Date();

  constructor(private goalService: GoalService){}

  addGoal(name: string, chosenDay: any){
    if (name) {
      this.goalService.addGoal(name, chosenDay);
    }
  }

  setDate(date:any) {
    const d2 = new Date(date);
    d2.setHours(12,0,0,0);
    this.chosenDay = d2;
  }
}
