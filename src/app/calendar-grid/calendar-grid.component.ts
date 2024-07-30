// src/app/calendar-grid/calendar-grid.component.ts
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from '../event-modal/event.model';
import { CalendarDayComponent } from '../calendar-day/calendar-day.component';

@Component({
  selector: 'app-calendar-grid',
  standalone: true,
  imports: [CommonModule, CalendarDayComponent],
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss']
})
export class CalendarGridComponent implements OnChanges {
  @Input() currentDate!: Date;
  @Input() events: { [key: string]: Event[] } = {};
  @Output() addEvent = new EventEmitter<Date>();
  @Output() editEvent = new EventEmitter<Event>();

  weeks: Date[][] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentDate']) {
      this.weeks = this.generateCalendar(this.currentDate);
    }
  }

  generateCalendar(date: Date): Date[][] {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDate = new Date(startOfMonth);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const endDate = new Date(endOfMonth);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const weeks: Date[][] = [];
    let week: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      week.push(new Date(currentDate));
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weeks;
  }

  onAddEvent(day: Date) {
    this.addEvent.emit(day);
  }

  onEditEvent(event: Event) {
    this.editEvent.emit(event);
  }
}
