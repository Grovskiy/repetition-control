import { Component, Output, Input, EventEmitter } from '@angular/core';
import { arrayMonth } from '../helper/arrayMonth';
import { MoonsService } from './../services/moons.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  realNameMonth:string = '';
  fakeDays:any = [];
  realDays:any = [];
  waitingDays:any = [];
  doneDays:any = [];
  moons:any = this.moonsService.getMoons

  @Input() isSettingMode = false; 
  @Output() addWaitingDaysEvent = new EventEmitter<string>();
  @Output() removeWaitingDaysEvent = new EventEmitter<number>();

  constructor(private moonsService: MoonsService){}

  ngOnInit(){
    this._createArrayMonth();
  }
  
  addNewItem(value: string) {
    this.addWaitingDaysEvent.emit(value);
  }

  setSettingMode(state:boolean) {
    this.isSettingMode = state;
  }

  _getLastDayOfMonth(year: any, month: any) {
    return new Date(year, month + 1, 0);
  }
  _getFirstDayOfMonth(year: any, month: any) {
    return new Date(year, month, 1);
  }
  _createArrayMonth() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const year = now.getFullYear();

    const monthInitial = now.getMonth();
    const monthFormatted = now.getMonth() + 1;
    const monthName = arrayMonth[monthInitial];
    this.realNameMonth = monthName;

    const lastDay = this._getLastDayOfMonth(year, monthInitial);
    const lastDayNumber = lastDay.getDate();

    const firstDay = this._getFirstDayOfMonth(year, monthInitial);
    const firstDayNumber = firstDay.getDate();
    const firstDayName = firstDay.getDay();

    console.log(
      'year ' + year,
      'month ' + monthFormatted,
      'nameMonth ' + monthName
    );
    console.log('firstDay ' + firstDay, firstDayName);
    console.log('lastDay ' + lastDay);
    console.log('..................................');

    let prevDayArrays: any = [];
    for (let i = 1; i < firstDayName; i++) {
      prevDayArrays.push(null);
    }
    this.fakeDays = prevDayArrays;

    const mainDaysCalendar: any = [];
    for (let i = 1; i <= lastDayNumber; i++) {
      mainDaysCalendar.push(this._getTimestamp(year, monthInitial, i));
    }
    this.realDays = mainDaysCalendar;
  }

  _getTimestamp(year: any, month: any, day: any) {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  }

  hasWeekend(timestamp:any) {
   const d = new Date(timestamp).getDay();
   return d == 6 || d == 0;
  }

  hasWaitingDays(date:any) {
    return this.waitingDays.includes(date);
  }

  hasDoneDay(date:any) {
    return this.doneDays.includes(date);
  }

  addDoneDay(date:any) {
    console.log('addDoneDay', date);    
    this.doneDays.push(date);
  }

  removeDoneDay(date:number) {
    console.log('removeDoneDay', date);  
    this.doneDays = this.doneDays.filter((x:number) => x !== date)
  }

  addWaitingDay(date:any) {
    this.addWaitingDaysEvent.emit(date);
    this.waitingDays.push(date);
  }

  removeWaitingDay(date:number) {
    this.removeWaitingDaysEvent.emit(date);
    this.waitingDays = this.waitingDays.filter((x:number) => x !== date)
  }

}
