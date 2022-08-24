import {Component, Input} from '@angular/core';
import {GoalService} from "../goal.service";

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss']
})
export class GoalComponent {
  isChangeName: boolean = false;
  isVisibleAddWeek: boolean = false;

  @Input() goal:any = {
    id: 0,
    text: '',
    days: [],
  };

  constructor(private goalService: GoalService){}

  removeGoal(id: number) {
    this.goalService.removeGoal(id);
  }

  addWeek(id: number) {
    this.goalService.addWeek(id);
  }

  changeName(id: number, name: string) {
    this.goalService.changeName(id, name);
  }

  toggleIsChangeName() {
    this.isChangeName = !this.isChangeName;
  }
}

