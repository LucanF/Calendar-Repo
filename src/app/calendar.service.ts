import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private currentMonth: number;
  private currentYear: number;
  private events: any[] = [];

  constructor() {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
  }

  getCurrentMonth() {
    return this.currentMonth;
  }

  getCurrentYear() {
    return this.currentYear;
  }

  getEvents() {
    return this.events;
  }

  addEvent(event: any) {
    this.events.push(event);
  }
}
