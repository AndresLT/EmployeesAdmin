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
    this.usersList = JSON.parse(this.localService.getData('users') || "[]")
    if(this.usersList.length == 0){
      this.localService.saveData('users', JSON.stringify(UsersList))
      this.usersList = JSON.parse(this.localService.getData('users'))
    }
    console.log(this.usersList);

  }

  login(user: User){
    if(this.usersList.find(x => x.user === user.user && x.pass === user.pass && x.active === true)){
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

  getUserList(){
    try{
      return JSON.parse(this.localService.getData('users'))
    }catch{
      return null
    }
  }

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

  async get<T>(endpoint: string, service: string){
    return await lastValueFrom(this.http.get<T>(endpoint + service))
  }
}
