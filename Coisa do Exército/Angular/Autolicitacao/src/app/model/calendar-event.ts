import {Injectable } from "@angular/core";



Injectable({
    providedIn: 'root',
})

export interface CalendarEvent{
  date: string; title: string
}