import { Component, OnInit, Input } from '@angular/core';
import { MoonsService } from './../services/moons.service';

@Component({
  selector: 'app-day-moon',
  templateUrl: './day-moon.component.html',
  styleUrls: ['./day-moon.component.scss']
})
export class DayMoonComponent implements OnInit {
  @Input() renderNumber = 0; 
  @Input() date = 0; 

  constructor(private moonsService: MoonsService){}

  get moons() {
    return this.moonsService.getMoons;
  }

  get moonOne() {
    return this.moonsService.getMoons[0] || [];
  }
  get moonTwo() {
    return this.moonsService.getMoons[1] || [];
  }

  ngOnInit(): void {
  }

  checkWaitingDays(array:any) {        
    return array ? array.includes(this.date) : false;
  }

}
