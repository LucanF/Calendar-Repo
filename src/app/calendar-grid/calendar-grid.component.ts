import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarDayComponent } from '../calendar-day/calendar-day.component';

@Component({
  selector: 'app-calendar-grid',
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss'],
  standalone: true,
  imports: [CommonModule, CalendarDayComponent]
})
export class CalendarGridComponent implements OnChanges {
  @Input() currentDate!: Date;
  @Input() events: { [key: string]: any[] } = {};
  @Output() addEvent = new EventEmitter<Date>();
  weeks: Date[][] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentDate']) {
      this.generateCalendar();
    }
  }

  generateCalendar(): void {
    this.weeks = [];
    const startOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    let startDate = new Date(startOfMonth);
    while (startDate.getDay() !== 0) {
      startDate = new Date(startDate.getTime() - 24 * 60 * 60 * 1000);
    }

    let currentDate = new Date(startDate);
    for (let week = 0; week < 6; week++) {
      const weekArray: Date[] = [];
      for (let day = 0; day < 7; day++) {
        weekArray.push(new Date(currentDate));
        currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
      }
      this.weeks.push(weekArray);
    }
  }

  onAddEvent(day: Date) {
    this.addEvent.emit(day);
  }
}
