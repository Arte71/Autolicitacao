// src/app/screens/preencher/preencher.ts (MODERNO: USANDO SIGNALS, toSignal E effect)

import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LicitacoesService } from '../../services/licitacoes.service'; 
import { TabelaItem, Orgao, ItemComOrgao } from '../../model/licitacoes.model'; 
import { Pesqpreco } from '../../screens/pesqpreco/pesqpreco'; 
import { lastValueFrom, forkJoin, map } from 'rxjs'; 
import { toSignal } from '@angular/core/rxjs-interop'; // 🌟 NOVO: toSignal para reatividade

@Component({
  selector: 'app-preencher',
  standalone: true,
  imports: [CommonModule, Pesqpreco],
  templateUrl: './preencher.html',
  styleUrl: './preencher.scss',
})
export class Preencher { // Removido 'implements OnInit'

  private readonly route = inject(ActivatedRoute);
  private readonly licitacoesService = inject(LicitacoesService);

  // 🌟 1. EXTRAÇÃO REATIVA DO PARÂMETRO DA ROTA USANDO toSignal 🌟
  // nomeTabela AGORA é um Signal que contém o _id da Licitação.
  nomeTabela = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('nomeTabela') || '') 
    ),
    { initialValue: '' }
  );
    
  // 🌟 2. ESTADO GERENCIADO POR SIGNALS 🌟
  orgaos = signal<Orgao[]>([]); 
  itensAgregados = signal<ItemComOrgao[]>([]); 
  isLoading = signal<boolean>(true);
  colunasVisiveis = signal<string[]>([]); // Usando Signal

  // Variáveis não reativas
  selectedFile: File | null = null; 
  isUploading: boolean = false; 
  readonly caminhoModeloArquivo: string = 'assets/modelo/modelo_de_arquivo.xlsx'; 
  

  constructor() {
    // 🌟 3. DISPARADOR REATIVO (EFFECT) 🌟
    // Este effect roda sempre que nomeTabela() mudar.
    effect(() => {
      const idLicitacao = this.nomeTabela();
      
      if (idLicitacao) {
        // Chamada assíncrona e não bloqueante
        this.loadData(idLicitacao);
      } else {
        this.isLoading.set(false);
        console.error('ID da Licitação (_id) não encontrado.');
      }
    });
  }

  // 🌟 4. FUNÇÃO DE CARREGAMENTO DE DADOS (USANDO ASYNC/AWAIT COM forkJoin) 🌟
  async loadData(idLicitacao: string): Promise<void> {
    this.isLoading.set(true);

    try {
      const itens$ = this.licitacoesService.getItensByTableName(idLicitacao);
      const orgaos$ = this.licitacoesService.getOrgaosByLicitacaoId(idLicitacao);

      // Combina e espera os resultados de ambas as chamadas (moderno e limpo)
      const [itens, orgaos] = await lastValueFrom(forkJoin([itens$, orgaos$]));

      this.orgaos.set(orgaos);
      this.colunasVisiveis.set(this.generateColunas(orgaos));
      this.itensAgregados.set(this.aggregateItems(itens, orgaos));

    } catch (err) {
      console.error('Erro ao carregar dados agregados:', err);
      this.itensAgregados.set([]);
      this.orgaos.set([]);
      this.colunasVisiveis.set(['itemId', 'descricao', 'catmat']);
    } finally {
      this.isLoading.set(false);
    }
  }

  generateColunas(orgaos: Orgao[]): string[] {
    let colunas = ['itemId', 'descricao', 'catmat'];
    orgaos.forEach(o => colunas.push(o.nomeOrgao)); 
    return colunas;
  }

  aggregateItems(itens: TabelaItem[], orgaos: Orgao[]): ItemComOrgao[] {
    // Lógica de agregação (mantida conforme o raciocínio anterior)
    return itens.map((item, itemIndex) => {
      const quantidadesPorOrgao: { [orgaoId: string]: number } = {};
      orgaos.forEach(orgao => {
        quantidadesPorOrgao[orgao.nomeOrgao] = orgao.qtd[itemIndex] || 0;
      });
      return {
        ...item,
        quantidadesPorOrgao: quantidadesPorOrgao
      } as ItemComOrgao;
    });
  }

  // --- MÉTODOS DE AÇÃO (AJUSTADOS PARA USAR SIGNALS) ---

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFile = file || null;
  }
  
  async handleFileUpload(): Promise<void> {
    // Usa o valor atual do Signal
    const currentId = this.nomeTabela(); 

    if (!this.selectedFile || !currentId) {
      console.error('Arquivo ou ID da licitação ausente.');
      return;
    }

    this.isUploading = true;
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('nomeTabela', currentId); // Usa o _id

    const uploadUrl = 'http://localhost:3000/api/upload-itens'; 
    
    try {
      await lastValueFrom(
        this.licitacoesService.uploadFile(uploadUrl, formData)
      );
      
      alert('Arquivo enviado com sucesso!');
      this.loadData(currentId); // Recarrega os dados (usando o ID)
      
    } catch (error) {
      console.error('Erro durante o upload do arquivo:', error);
      alert('Falha ao enviar o arquivo. Verifique o console.');
    } finally {
      this.isUploading = false;
      this.selectedFile = null; 
    }
  }

  processItem(item: TabelaItem): TabelaItem {
    // Lógica mantida
    return Object.entries(item).reduce((acc, [key, value]) => {
        const processedValue = (value === null || value === undefined) ? 0 : value;
        acc[key as keyof TabelaItem] = processedValue as any; 
        return acc;
    }, { ...item } as TabelaItem); 
  }

  downloadModelo(): void {
    console.log('Caminho para download do modelo:', this.caminhoModeloArquivo);
  }
}