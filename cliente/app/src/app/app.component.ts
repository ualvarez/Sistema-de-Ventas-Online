import { Component } from '@angular/core';
import { ApiauthService } from './services/apiauth.service';
import { Usuario } from './models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  usuario: Usuario;
  _sesionLabel = 'Iniciar Sesión';
  _sesionEstado: boolean = false;

  constructor(public apiauthService: ApiauthService, private router: Router) 
  {
    this.apiauthService.usuario.subscribe(res =>{
      this.usuario = res;
      console.log('cambió el objeto: ' + res);
    });
   
  }

  logout() {
    console.log('cerró sesión el usuario');
    this.apiauthService.logout();
    this.router.navigate(['/login']);
  }


}
