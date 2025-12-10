// src/app/screens/generetes/relacao-itens/relacao-itens.ts

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RelacaoService } from '../../services/relacao-itens.service';
import { ItemRelacao } from '../../model/relacao.model';

@Component({
  selector: 'app-relacao-itens',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relacao-itens.html',
  styleUrl: './relacao-itens.scss',
})
export class RelacaoItens {

  private route = inject(ActivatedRoute);
  private relacaoService = inject(RelacaoService);

  loading = signal(true);

  
  readonly nomeTabela = toSignal(
    this.route.paramMap.pipe(map(p => p.get('nomeTabela') || '')),
    { initialValue: '' }
  );

  
  readonly listaItens = toSignal(
    this.route.paramMap.pipe(
      map(p => p.get('nomeTabela')),
      switchMap(id => {
        if (!id) return of([]);
        
        this.loading.set(true);
        
        
        return this.relacaoService.getItensFormatados(id).pipe(
          tap(() => this.loading.set(false))
        );
      })
    ),
    { initialValue: [] as ItemRelacao[] }
  );
}