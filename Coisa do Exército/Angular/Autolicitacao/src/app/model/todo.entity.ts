import {Injectable, signal } from "@angular/core";



Injectable({
    providedIn: 'root',
})

export interface todo {
    id: string;
    title: string;
    completed: boolean;
}
