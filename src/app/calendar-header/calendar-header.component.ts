import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CalendarHeaderComponent implements OnChanges {
  @Input() currentDate!: Date;
  @Output() previousMonth = new EventEmitter<void>();
  @Output() nextMonth = new EventEmitter<void>();

  currentMonth!: string;
  currentYear!: number;

  constructor() {
    this.updateDate(new Date());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentDate']) {
      this.updateDate(this.currentDate);
    }
  }

  updateDate(date: Date): void {
    this.currentMonth = date.toLocaleString('default', { month: 'long' });
    this.currentYear = date.getFullYear();
  }

  onPreviousMonth(): void {
    this.previousMonth.emit();
  }

  onNextMonth(): void {
    this.nextMonth.emit();
  }
}
