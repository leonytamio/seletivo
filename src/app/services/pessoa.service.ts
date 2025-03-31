import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa, InfoSubmission } from '../models/pessoa';
import { DialogComponent } from '../pages/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private apiUrl = 'https://abitus-api.geia.vip/v1';

  constructor(private http: HttpClient) {}

  

  getPessoas(params:any): Observable<any> {

    const pagina = params.pagina - 1;
    const apiParams = {
      faixaIdadeInicial: params.faixaIdadeInicial || 0,
      faixaIdadeFinal: params.faixaIdadeFinal || 0,
      nome: params.nome || '',
      porPagina: params.porPagina || 12,
      sexo: params.sexo || '',
      pagina: pagina === -1 ? '0' : pagina.toString(),
      status: params. status || 'DESAPARECIDO',
    }
    return this.http.get(`${this.apiUrl}/pessoas/aberto/filtro`, {
      params: apiParams
    });
  }

  getPessoaById(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.apiUrl}/pessoas/${id}`);
  }

  submitInfo(formInforma: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ocorrencias/informacoes-desaparecido`, formInforma);
  }

}