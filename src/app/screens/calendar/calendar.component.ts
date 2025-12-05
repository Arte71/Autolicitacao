import { Component, input, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CalendarServiceService } from '../../services/calendar.service.service';
import { CalendarEvent } from '../../model/calendar-event';
import { MenuItemComponent } from '../../components/shared/menu-item/menu-item.component';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, MenuItemComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {

  // input signal
  apiUrl = input<string>('');

  weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  monthNames = [
    'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
  ];

  displayYear = new Date().getFullYear();
  displayMonth = new Date().getMonth();

  calendarDays: Array<{
    day: number,
    otherMonth: boolean,
    isToday: boolean,
    isEvent: boolean,
    isTodayEvent?: boolean,
    iso?: string,
    eventTitle?: string
  }> = [];

  eventsMap = new Map<string, CalendarEvent>();
  private eventsSub: Subscription | null = null;

  constructor(private calendarService: CalendarServiceService) {

    // efeito para recarregar eventos quando apiUrl mudar
    effect(() => {
      const url = this.apiUrl();
      if (!url) {
        if (this.eventsSub) this.eventsSub.unsubscribe();
        return;
      }

      if (this.eventsSub) this.eventsSub.unsubscribe();

      this.eventsSub = this.calendarService.fetchEvents(url).subscribe({
        next: (events) => {
          this.loadEvents(events);
          this.buildCalendar(this.displayYear, this.displayMonth);
        },
        error: () => {
          this.buildCalendar(this.displayYear, this.displayMonth);
        }
      });
    });
  }

  ngOnInit() {
    // define mês/ano atual considerando horário de Brasília
    this.initDisplayToTodayInBrasilia();
    this.buildCalendar(this.displayYear, this.displayMonth);
  }

  ngOnDestroy() {
    if (this.eventsSub) this.eventsSub.unsubscribe();
  }

  private initDisplayToTodayInBrasilia() {
    const fmt = new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      year:'numeric', month:'2-digit', day:'2-digit'
    });

    const parts = fmt.formatToParts(new Date());
    this.displayYear = Number(parts.find(p=>p.type==='year')?.value);
    this.displayMonth = Number(parts.find(p=>p.type==='month')?.value) - 1;
  }

  prevMonth() {
    if (this.displayMonth === 0) {
      this.displayMonth = 11;
      this.displayYear -= 1;
    } else {
      this.displayMonth -= 1;
    }
    this.buildCalendar(this.displayYear, this.displayMonth);
  }

  nextMonth() {
    if (this.displayMonth === 11) {
      this.displayMonth = 0;
      this.displayYear += 1;
    } else {
      this.displayMonth += 1;
    }
    this.buildCalendar(this.displayYear, this.displayMonth);
  }

  private loadEvents(events: CalendarEvent[] = []) {
    // armazena eventos normalizados por ISO
    this.eventsMap.clear();
    for (const e of events) {
      const iso = this.normalizeToISODate(e.date);
      if (iso) this.eventsMap.set(iso, e);
    }
  }

  private buildCalendar(year: number, month: number) {
    // limpa array antes de construir
    this.calendarDays = [];

    const first = new Date(year, month, 1);
    const startWeekday = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    const todayISO = this.getTodayISOInBrasilia();

    // dias do mês anterior
    for (let i = startWeekday - 1; i >= 0; i--) {
      const dayNum = prevMonthDays - i;
      const dateObj = new Date(year, month - 1, dayNum);
      const iso = this.toISODate(dateObj);
      this.calendarDays.push({
        day: dayNum,
        otherMonth: true,
        isToday: iso === todayISO,
        isEvent: this.eventsMap.has(iso),
        isTodayEvent: iso === todayISO && this.eventsMap.has(iso), 
        iso,
        eventTitle: this.eventsMap.get(iso)?.title
      });
    }

    // dias do mês atual
    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(year, month, d);
      const iso = this.toISODate(dateObj);
      this.calendarDays.push({
        day: d,
        otherMonth: false,
        isToday: iso === todayISO,
        isEvent: this.eventsMap.has(iso),
        isTodayEvent: iso === todayISO && this.eventsMap.has(iso),
        iso,
        eventTitle: this.eventsMap.get(iso)?.title
      });
    }

    // dias do próximo mês
    while (this.calendarDays.length % 7 !== 0) {
      const nextIndex = this.calendarDays.length - startWeekday - daysInMonth + 1;
      const dateObj = new Date(year, month + 1, nextIndex);
      const iso = this.toISODate(dateObj);
      this.calendarDays.push({
        day: dateObj.getDate(),
        otherMonth: true,
        isToday: iso === todayISO,
        isEvent: this.eventsMap.has(iso),
        isTodayEvent: iso === todayISO && this.eventsMap.has(iso), 
        iso,
        eventTitle: this.eventsMap.get(iso)?.title
      });
    }
  }

  private toISODate(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private normalizeToISODate(s?: string) {
    if (!s) return null;

    const isoMatch = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) return isoMatch[0];

    const brMatch = s.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
    if (brMatch) return `${brMatch[3]}-${brMatch[2]}-${brMatch[1]}`;

    const parsed = new Date(s);
    if (!isNaN(parsed.getTime())) return this.toISODate(parsed);

    return null;
  }

  private getTodayISOInBrasilia() {
    const fmt = new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      year:'numeric', month:'2-digit', day:'2-digit'
    });

    const parts = fmt.formatToParts(new Date());
    const d = String(Number(parts.find(p=>p.type==='day')?.value)).padStart(2,'0');
    const m = String(Number(parts.find(p=>p.type==='month')?.value)).padStart(2,'0');
    const y = parts.find(p=>p.type==='year')?.value;
    return `${y}-${m}-${d}`;
  }
}
