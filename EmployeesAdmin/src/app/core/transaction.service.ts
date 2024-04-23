import { Injectable } from '@angular/core';
import { LocalService } from './local.service';
import { User, UsersList } from './Model/User';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  usersList: User[] = []

  constructor(private localService: LocalService, private router: Router, private http: HttpClient) {}

  setUsersListToLocalStorage(){
    if(this.usersList.length == 0){
      this.localService.saveData('users', JSON.stringify(UsersList))
    }
    this.usersList = JSON.parse(this.localService.getData('users'))
    console.log(this.usersList);

  }

  login(user: User){
    if(this.usersList.find(x => x.user === user.user && x.pass === user.pass)){
      this.localService.saveData('user', JSON.stringify(this.usersList.find(x => x.user === user.user)))
      this.router.navigate(['/dashboard'])
      return true
    }else{
      return false
    }
  }

  logout(){
    try{
      this.localService.removeData('user')
      this.router.navigate(['/'])
      return true
    }catch{
      return false
    }
  }

  createUser(user: User){
    try{
      this.usersList.push(user)
      return true
    }catch{
      return false
    }
  }

  updatePassword(user: User){
    if(this.usersList.find(x => x.user === user.user)){
      console.log('Usuario encontrado',this.usersList[this.usersList.indexOf(this.usersList.find(x => x.user === user.user)!)]);
      this.usersList[this.usersList.indexOf(this.usersList.find(x => x.user === user.user)!)].pass = user.pass
      return true
    }else{
      return false
    }

  }

  updateUser(user: User){

  }

  updateRole(user: string, newRole: string){

  }

  async get<T>(endpoint: string, service: string){
    return await lastValueFrom(this.http.get<T>(endpoint + service))
  }
}
