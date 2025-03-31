import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../models/pessoa';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-pessoa-detalhe',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './pessoa-detalhe.component.html',
})
export class PessoaDetalheComponent implements OnInit {
  pessoa: Pessoa | undefined;

  constructor(private route: ActivatedRoute, private pessoaService: PessoaService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pessoaService.getPessoaById(id).subscribe((data) => {
      this.pessoa = data;
    });
  }
}