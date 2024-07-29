import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarGridComponent } from './calendar-grid/calendar-grid.component';
import { EventModalComponent } from './event-modal/event-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, CalendarHeaderComponent, CalendarGridComponent, EventModalComponent]
})
export class AppComponent {
  currentDate: Date = new Date();
  selectedDay?: Date;
  selectedEvent?: any;
  events: { [key: string]: any[] } = {};

  onPreviousMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
  }

  onNextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
  }

  onAddEvent(day: Date): void {
    console.log('onAddEvent called', day);
    this.selectedDay = day;
    this.selectedEvent = null;
  }

  onEditEvent(eventData: any): void {
    console.log('onEditEvent called with eventData:', eventData);
    this.selectedDay = new Date(eventData.date);  // Ensure the date format is correct
    this.selectedEvent = eventData;
    console.log('Selected Event:', this.selectedEvent);
  }

  onSaveEvent(event: any): void {
    const dateKey = this.selectedDay?.toDateString();
    if (dateKey) {
      if (!this.events[dateKey]) {
        this.events[dateKey] = [];
      }
      // Check if we are editing an existing event
      if (this.selectedEvent) {
        const index = this.events[dateKey].indexOf(this.selectedEvent);
        if (index !== -1) {
          this.events[dateKey][index] = event;
        } else {
          this.events[dateKey].push(event);
        }
      } else {
        this.events[dateKey].push(event);
      }
      this.selectedDay = undefined;
      this.selectedEvent = undefined;
    }
  }

  onCloseModal(): void {
    this.selectedDay = undefined;
    this.selectedEvent = undefined;
  }

  getEventsForDay(day: Date): any[] {
    return this.events[day.toDateString()] || [];
  }
}
