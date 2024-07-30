import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Event } from './event.model';

@Component({
  selector: 'app-event-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
})
export class EventModalComponent {
  @Input() event!: Event; // Use non-null assertion operator
  @Output() saveEvent = new EventEmitter<Event>();
  @Output() closeModal = new EventEmitter<void>();

  onSave() {
    this.saveEvent.emit(this.event);
    this.closeModal.emit();
  }

  onClose() {
    this.closeModal.emit();
  }
}
