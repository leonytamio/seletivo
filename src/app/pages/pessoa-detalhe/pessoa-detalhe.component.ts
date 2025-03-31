import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../models/pessoa';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';7
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';




@Component({
  selector: 'app-pessoa-detalhe',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './pessoa-detalhe.component.html',
})
export class PessoaDetalheComponent implements OnInit {
  pessoa!: Pessoa;

  constructor(private route: ActivatedRoute, private pessoaService: PessoaService, public dialog: MatDialog) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pessoaService.getPessoaById(id).subscribe((data) => {
      this.pessoa = data;
    });
  }

  PessoaSemFoto(): string {    
    if (!this.pessoa.urlFoto)
      return "../assets/img/no-photo.svg";
    return this.pessoa.urlFoto;
  }
  
  updateUrlError() {
    this.pessoa.urlFoto = "../assets/img/no-photo.svg";
  }

  openDialog (): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { ocoId: this.pessoa.ultimaOcorrencia.ocoId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}