import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { PessoaService } from '../../services/pessoa.service';
import { PessoaCardComponent } from '../../components/pessoa-card/pessoa-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import { Pessoa } from '../../models/pessoa';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NgxPaginationModule} from 'ngx-pagination';



@Component({
  selector: 'app-pessoa-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PessoaCardComponent, ReactiveFormsModule,MatFormFieldModule, MatInputModule,MatIconModule, MatRadioModule, NgxPaginationModule, MatCardModule, MatPaginatorModule],
  templateUrl: './pessoa-lista.component.html',
})
export class PessoaListaComponent implements OnInit {
  pessoas: Pessoa[] = [];
  currentPage = 0;
  totalPage = 0;
  page = 0;
  p = 0;
  pageSize = 15;
  filtro = '';
  descricao!: boolean;
  status!: String;
  
  searchParams: any;
  apiParams = {
    faixaIdadeFinal: 0,
    faixaIdadeInicial: 0,
    nome: '',
    porPagina: 15,
    sexo: '',
    pagina:  1,
    status: 'DESAPARECIDO',
  }
  
  constructor(private pessoaService: PessoaService, private fb:UntypedFormBuilder) {

    this.searchParams = this.fb.group({
    faixaIdadeFinal: [''],
    faixaIdadeInicial: [''],
    nome: [''],
    sexo: [''],
    status: ['DESAPARECIDO'],
    });
  }

  get formControls() {
    return this.searchParams.controls;
  }
  
  ngOnInit(): void {
    this.loadPessoas();
  }
  
  loadPessoas(): void {
    this.status = this.apiParams.status;
    this.pessoaService.getPessoas(this.apiParams).subscribe(res => {
      this.pessoas = res["content"];
      this.totalPage = res["totalElements"];
    });
  }

  onSearch(): void {
    this.apiParams.pagina = 0;
    this.apiParams.nome = ''
    this.loadPessoas();

  }
  
  nextPage(): void {
    this.apiParams.pagina++;
    this.loadPessoas();
  }
  
  prevPage(): void {
    if (this.apiParams.pagina > 0) {
      this.apiParams.pagina--;
      this.loadPessoas();
    }
  }
  
  clear() {
    this.searchParams.reset();
  }
  
  
  onSubmit() {
    this.apiParams.nome = this.searchParams.get('nome')?.value || '';
    this.apiParams.sexo = this.searchParams.get('sexo')?.value || '';
    this.apiParams.status = this.searchParams.get('status')?.value || '';
    this.apiParams.pagina = 1;
    this.loadPessoas();
  }
  
}
