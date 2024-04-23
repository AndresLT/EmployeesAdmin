import { Injectable } from '@angular/core';
import { LocalService } from './local.service';
import { User, UsersList } from './Model/User';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// Servicio principal de las transacciones que se
// realizan en toda la aplicación
export class TransactionService {

  usersList: User[] = []

  constructor(private localService: LocalService, private router: Router, private http: HttpClient) {}

  // Metodo que se ejecuta antes que todos desde el
  // app.component para cargar la lista inicial de usuarios
  setUsersListToLocalStorage(){
    this.usersList = JSON.parse(this.localService.getData('users') || "[]")
    if(this.usersList.length == 0){
      this.localService.saveData('users', JSON.stringify(UsersList))
      this.usersList = JSON.parse(this.localService.getData('users'))
    }
  }

  // Metodo para iniciar sesión
  login(user: User){
    if(this.usersList.find(x => x.user === user.user && x.pass === user.pass && x.active === true)){
      this.localService.saveData('user', JSON.stringify(this.usersList.find(x => x.user === user.user)))
      this.router.navigate(['/dashboard'])
      return true
    }else{
      return false
    }
  }

  // Metodo para cerrar sesión
  logout(){
    try{
      this.localService.removeData('user')
      this.router.navigate(['/'])
      return true
    }catch{
      return false
    }
  }

  // Metodo para obtener la lista de usuarios actuales
  getUserList(){
    try{
      return JSON.parse(this.localService.getData('users'))
    }catch{
      return null
    }
  }

  // Metodo para crear usuarios
  createUser(user: User){
    try{
      if(this.usersList.find(x => x.user === user.user)){
        return false
      }else{
        this.usersList.push(user)
        this.localService.saveData('users', JSON.stringify(this.usersList))
        return true
      }
    }catch{
      return false
    }
  }

  // Metodo para actualizar la contraseña de un usuario
  updatePassword(user: User){
    try{

      if(this.usersList.find(x => x.user === user.user)){
        this.usersList[this.usersList.indexOf(this.usersList.find(x => x.user === user.user)!)].pass = user.pass
        this.localService.saveData('users', JSON.stringify(this.usersList))
        return true
      }else{
        return false
      }
    }catch{
      return false
    }

  }

  // Metodo para actualizar todos los datos de un usuario
  updateUser(user: User){
    try{
      if(this.usersList.find(x => x.user === user.user)){
        this.usersList[this.usersList.indexOf(this.usersList.find(x => x.user === user.user)!)] = user
        this.localService.saveData('users', JSON.stringify(this.usersList))
        if(user.user === JSON.parse(this.localService.getData('user')).user){
          this.localService.saveData('user', JSON.stringify(this.usersList.find(x => x.user === user.user)))
        }
        return true
      }else{
        return false
      }
    }catch{
      return false
    }
  }

  // Metodo para actualizar el rol de un usuario loggeado
  updateRole(user: string, newRole: string){
    try{
      this.usersList[this.usersList.indexOf(this.usersList.find(x => x.user === user)!)].role = newRole
      this.localService.saveData('user', JSON.stringify(this.usersList.find(x => x.user === user)))
      this.localService.saveData('users', JSON.stringify(this.usersList))
      return true
    }catch{
      return false
    }
  }

  // Metodo para abandonar la compañia por un usuario loggeado
  abandon(user: string){
    try{
      this.usersList[this.usersList.indexOf(this.usersList.find(x => x.user === user)!)].active = false
      this.localService.saveData('user', JSON.stringify(this.usersList.find(x => x.user === user)))
      this.localService.saveData('users', JSON.stringify(this.usersList))
      return true
    }catch{
      return false
    }
  }

  // Metodo get genérico que devuelve una promesa y puede ser ejecutado de forma asíncrona
  async get<T>(endpoint: string, service: string){
    return await lastValueFrom(this.http.get<T>(endpoint + service))
  }
}
