import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarEvent } from '../model/calendar-event';

@Injectable({
  providedIn: 'root',
})


export class CalendarServiceService {
  constructor(private http: HttpClient) {}

  fetchEvents(url: string): Observable<CalendarEvent[]>{
    return this.http.get<CalendarEvent[]>(url);
}
}
