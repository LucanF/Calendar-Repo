// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarGridComponent } from './calendar-grid/calendar-grid.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { EventModalComponent } from './event-modal/event-modal.component';
import { Event } from './event-modal/event.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarGridComponent,
    CalendarHeaderComponent,
    EventModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentDate: Date = new Date();
  events: { [key: string]: Event[] } = {};
  selectedEvent: Event | null = null;

  onAddEvent(day: Date) {
    this.selectedEvent = { title: '', description: '', date: day };
  }

  onEditEvent(event: Event) {
    this.selectedEvent = event;
  }

  onSaveEvent(event: Event) {
    const dateKey = event.date.toDateString();
    if (!this.events[dateKey]) {
      this.events[dateKey] = [];
    }
    const eventIndex = this.events[dateKey].findIndex(e => e === this.selectedEvent);
    if (eventIndex >= 0) {
      this.events[dateKey][eventIndex] = event;
    } else {
      this.events[dateKey].push(event);
    }
    this.selectedEvent = null;
  }

  onCloseModal() {
    this.selectedEvent = null;
  }

  onPreviousMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
  }

  onNextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
  }
}
