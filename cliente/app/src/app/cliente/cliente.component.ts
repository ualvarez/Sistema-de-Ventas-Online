import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { Response } from '../models/response';
import { DialogClienteComponent } from './Dialog/dialogCliente.Component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { DialogDeleteComponent } from '../common/delete/dialogDelete.Component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public lst: any[];
  public columnas: string[] = ['id', 'nombre', 'actions'];
  readonly width: string = '300'
  constructor(
    private apiCliente: ApiclienteService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this.apiCliente.getClientes().subscribe(response => { this.lst = response.data });
  }

  openAdd() {
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: this.width
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getClientes()
    });
  }

  openEdit(cliente: Cliente) {
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: this.width,
      data: cliente
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getClientes()
    });
  }

  delete(cliente: Cliente){
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: this.width    
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result){
       this.apiCliente.delete(cliente.id).subscribe(response =>{
         if(response.exito === 1){
           this.snackBar.open('Cliente eliminado con éxito','',{
             duration: 2000
           });
           this.getClientes();
         }
       });
     }
    });
  }
}
