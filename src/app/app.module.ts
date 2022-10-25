import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { CalendarComponent } from './calendar/calendar.component';
import { CreateComponent } from './create/create.component';
import { GoalComponent } from './goal/goal.component';
import { GoalDaysComponent } from './goal/goal-days/goal-days.component';
import { GoalAddWeekComponent } from './goal/goal-add-week/goal-add-week.component';
import { GoalService } from "./goal.service";
import { MoonsService } from "./services/moons.service";
import { MoonSaveComponent } from './moon-save/moon-save.component';
import { DayMoonComponent } from './day-moon/day-moon.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    GoalComponent,
    GoalDaysComponent,
    GoalAddWeekComponent,
    CalendarComponent,
    MoonSaveComponent,
    DayMoonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [GoalService, MoonsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
