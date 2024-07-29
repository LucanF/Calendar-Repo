import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEventComponent } from '../calendar-event/calendar-event.component';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
  standalone: true,
  imports: [CommonModule, CalendarEventComponent]
})
export class CalendarDayComponent implements OnInit {
  @Input() day!: Date;
  @Input() events: any[] = [];
  @Output() addEvent = new EventEmitter<Date>();
  @Output() editEvent = new EventEmitter<any>();

  ngOnInit(): void {}

  onAddEvent(event: MouseEvent) {
    event.stopPropagation();
    console.log('onAddEvent called with day:', this.day);
    this.addEvent.emit(this.day);
  }

  onEditEvent(event: MouseEvent, eventData: any) {
    event.stopPropagation();
    console.log('onEditEvent called with eventData:', eventData);
    this.editEvent.emit(eventData);
  }

  isToday(day: Date): boolean {
    const today = new Date();
    return day.getDate() === today.getDate() &&
           day.getMonth() === today.getMonth() &&
           day.getFullYear() === today.getFullYear();
  }
}
