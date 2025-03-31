import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { PessoaService } from '../../services/pessoa.service';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {provideNativeDateAdapter} from '@angular/material/core';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  providers: [provideNativeDateAdapter()],
  imports:[FormsModule, CommonModule, MatFormFieldModule, ReactiveFormsModule, MatNativeDateModule, MatDatepickerModule, MatTableModule]
})

export class DialogComponent implements OnInit {
  public formPessoa: FormGroup;
  errorStatus: number = 0;
  ocoId: number | undefined;
  dataInfo: Date = new Date();
  descricao: string | undefined;
  informacao: string | undefined;
  fileEvent: File[] = [];
  displayedColumns: String[] = ['nomeFile', 'sizeFile', 'action'];
  dataSource = new MatTableDataSource<File>();

  @ViewChild(MatTable) table: MatTable<DialogComponent> | undefined;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public fb: FormBuilder,
    private rest: PessoaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.formPessoa = this.fb.group({
      ocoId: [this.data.ocoId, [Validators.required]],
      informacao: ['', [Validators.required]],
      descricao: [''],
      dataInfo: [''],
      fileEvent: ['']
    });
  }

  ngOnInit (): void {
  }

  createData () {

    let formData: FormData = new FormData();
    let tempDate: moment.Moment = moment.utc(this.formPessoa.value.dataInfo).local();
    if (this.formPessoa.get('descricao')?.value.length !== 0) {
      Swal.fire('Há campos em branco!', 'Campo Descricão obrigatório!', 'warning');
    }
    else if (this.formPessoa.get('informacao')?.value.length == 0) {
      Swal.fire('Há campos em branco!', 'Campo Informação obrigatório!', 'warning');
    } else {
      formData.append('ocoId', this.formPessoa.get('ocoId')?.value);
      formData.append('descricao', this.formPessoa.get('descricao')?.value);
      formData.append('informacao', this.formPessoa.get('informacao')?.value);
      if ((this.formPessoa.value.dataInfo.length) == 0) {
        formData.append('data', this.formPessoa.value.dataInfo);
      } else {
        formData.append('data', tempDate.format('YYYY-MM-DD'));
      }
      for (let i = 0; i < this.fileEvent.length; i++) {
        formData.append('files', this.fileEvent[i]);
      }
      console.log(this.formPessoa.value.dataInfo);
      Swal.fire('Obrigado!', 'Informações gravadas com sucesso!', 'success');
      this.dialogRef.close();
      this.formPessoa.reset();
      this.rest.submitInfo(formData).subscribe();
      console.log(this.rest)
    }
  }

  cancel () {
    this.dialogRef.close(true);
    this.formPessoa.reset();
  }

  fileSelect (event: any) {
    this.errorStatus = 0;
    if (event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/png' ||
      event.target.files[0].type == 'image/jpg') {
      if (event.target.files[0].size <= 5242880) {
        this.fileEvent.push(event.target.files[0]);
        this.table?.renderRows();
        this.errorStatus = 0;
      } else { this.errorStatus = 1 }
    } else {
      this.errorStatus = 2;
    };
  }

  removeItem (id: any) {
    const index = this.fileEvent.indexOf(id);
    this.fileEvent.splice(index, 1);
    this.table?.renderRows();
  }
}
