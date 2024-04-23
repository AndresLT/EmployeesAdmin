import { Component } from '@angular/core';
import { User } from '../../core/Model/User';
import { TransactionService } from '../../core/transaction.service';
import Swal from 'sweetalert2'
import { LocalService } from '../../core/local.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  user: User

  constructor(private transactionService: TransactionService, private localService: LocalService){
    this.user = JSON.parse(this.localService.getData('user') || "{}")
  }

  logout(){
    if(this.transactionService.logout()){
      Swal.fire({
        text: 'Sesión cerrada correctamente',
        icon:'success'
      })
    }else{
      Swal.fire({
        text: 'Ocurrió un errror cerrando sesión',
        icon:'warning'
      })
    }
  }
}
