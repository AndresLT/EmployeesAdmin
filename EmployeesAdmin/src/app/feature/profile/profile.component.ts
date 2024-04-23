import { Component, OnInit } from '@angular/core';
import { UserIconComponent } from '../../shared/user-icon/user-icon.component';
import { LocalService } from '../../core/local.service';
import { User } from '../../core/Model/User';
import { DatePipe, TitleCasePipe } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TransactionService } from '../../core/transaction.service';
import { endpoint } from '../../core/environment/environment';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [UserIconComponent, DatePipe, MatSelectModule,MatFormFieldModule, TitleCasePipe, FormsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User
  roles: string[] = []

  roleSelect = new FormControl('', Validators.required);

  constructor(private localService: LocalService, private transactionService: TransactionService){
    this.user = JSON.parse(this.localService.getData('user'))
  }
  async ngOnInit(): Promise<void> {
    await this.getRoles()
    this.roleSelect.setValue(this.user.role!)
  }

  // metodo para obtener los puestos de trabajo
  async getRoles(){
    await this.transactionService.get<string[]>(endpoint,"").then((data: any) => {
      this.roles = data.positions
    },error => {
      Swal.fire({
        text: 'Error consultando puestos de trabajo.',
        icon:'warning'
      })
    })
  }

  // Metodo para actualizar el puesto de trabajo
  changeRole(){

    if(this.transactionService.updateRole(this.user.user, this.roleSelect.value!)){
      Swal.fire({
        text: 'Puesto de trabajo actualizado correctamente.',
        icon:'success'
      })
    }else{
      Swal.fire({
        text: 'Error actualizando puesto de trabajo.',
        icon:'warning'
      })
    }
  }

  // Metodo para abandonar la compañía
  // Funciona con una doble confirmación
  // Y lo que hace es deshabilitar al usuario
  // para que no pueda iniciar sesión
  abandon(){
    Swal.fire({
      title: "¿Estás seguro de querer abandonar la compañía?",
      text: "Este cambio solo lo puede revertir un administrador.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, quiero abandonar la compañía.",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.transactionService.abandon(this.user.user)){
          this.transactionService.logout()
          Swal.fire({
            title: "Has abandonado la compañía.",
            text: "Recuerda que si quieres volver a la compañía debes comunicarte con un administrador.",
            icon: "info"
          });

        }else{
          Swal.fire({
            text: "Ha ocurrido un error abandonando la compañía.",
            icon: "warning"
          });
        }
      }
    });
  }
}
