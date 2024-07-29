import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CalendarEventComponent {
  @Input() event: any;
}
