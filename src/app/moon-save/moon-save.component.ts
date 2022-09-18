import { Component, OnInit } from '@angular/core';
import { MoonsService } from './../services/moons.service';

@Component({
  selector: 'app-moon-save',
  templateUrl: './moon-save.component.html',
  styleUrls: ['./moon-save.component.scss']
})
export class MoonSaveComponent implements OnInit {
  isVisible:boolean = false;
  name:string = '';
  link:string = '';
  waitingDays:any = [];

  constructor(private moonsService: MoonsService){}
  
  ngOnInit(): void {
  }
  setVisibility(state:boolean) {
    this.isVisible = state;
  }

  saveMoon() {
    if (!this.name.length || !this.link.length || !this.waitingDays.length) return;
    this.moonsService.addMoon(this.name, this.link, this.waitingDays);
    this.setVisibility(false);
  }

  addWaitingDays(value:any) {
    this.waitingDays.push(value)
  }
  removeWaitingDays(value:number) {
    this.waitingDays = this.waitingDays.filter((x:number) => x !== value)
  }

}
