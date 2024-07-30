// src/app/calendar-day/calendar-day.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from '../event-modal/event.model';

@Component({
  selector: 'app-calendar-day',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent {
  @Input() day!: Date;
  @Input() events: Event[] = [];
  @Output() addEvent = new EventEmitter<Date>();
  @Output() editEvent = new EventEmitter<Event>();

  onAddEvent() {
    this.addEvent.emit(this.day);
  }

  onEditEvent(event: Event) {
    this.editEvent.emit(event);
  }

  get isCurrentDay(): boolean {
    const today = new Date();
    return this.day.toDateString() === today.toDateString();
  }
}
