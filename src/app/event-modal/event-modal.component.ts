import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EventModalComponent implements OnChanges {
  @Input() event: any;
  @Output() saveEvent = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();

  title: string = '';
  description: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    console.log('EventModalComponent ngOnChanges', changes);
    if (changes['event'] && this.event) {
      this.title = this.event.title || '';
      this.description = this.event.description || '';
      console.log('EventModalComponent received event:', this.event);
    }
  }

  onSave() {
    console.log('Saving event:', { title: this.title, description: this.description });
    this.saveEvent.emit({ title: this.title, description: this.description });
    this.closeModal.emit();
  }

  onClose() {
    console.log('Closing modal');
    this.closeModal.emit();
  }
}
