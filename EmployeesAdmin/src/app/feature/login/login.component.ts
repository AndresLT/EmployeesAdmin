import { User } from './../../core/Model/User';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import Swal from 'sweetalert2'
import { TransactionService } from '../../core/transaction.service';
import { endpoint } from '../../core/environment/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule,ReactiveFormsModule, MatButtonModule,MatProgressBarModule,MatDatepickerModule, MatSelectModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  passwordMatch = false
  passwordMatchRegister = false

  loading = false

  actualForm = "login"

  hidePass = true;
  hidePassConfirm = true;

  roles: string[] = []

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  changePasswordForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  })

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  })

  constructor(private transactionService: TransactionService){

  }
  async ngOnInit(): Promise<void> {
    await this.getRoles()
  }

  changeForm(form: string){
    this.actualForm = form
    this.hidePass = true
    this.hidePassConfirm = true
    this.loginForm.reset()
    this.changePasswordForm.reset()
    this.registerForm.reset()
  }

  login(){
    if(this.loginForm.valid){

      let user: User = {
        user: this.loginForm.get('username')!.value!,
        pass: this.loginForm.get('password')!.value!
      }
      if(this.transactionService.login(user)){
        Swal.fire({
          text: 'Inicio de sesion correcto',
          icon:'success'
        })
      }else{
        Swal.fire({
          text: 'Usuario o contraseña incorrectos o el usuario no existe.',
          icon:'warning'
        })
      }
    }
  }

  changePassword(){
    let user: User = {
      user: this.changePasswordForm.get('username')!.value!,
      pass: this.changePasswordForm.get('password')!.value!
    }
    if(this.transactionService.updatePassword(user)){
      Swal.fire({
        text: 'Contraseña actualizada correctamente',
        icon:'success'
      })
      this.changeForm('login')
    }else{
      Swal.fire({
        text: 'Error al cambiar contraseña',
        icon:'success'
      })
    }
  }

  registerUser(){
    let user : User = {
      user: this.registerForm.controls['username'].value!,
      name:this.registerForm.controls['name'].value!,
      lastName:this.registerForm.controls['lastname'].value!,
      birthDate:new Date(this.registerForm.controls['birthDate'].value!),
      role:this.registerForm.controls['role'].value!,
      pass: this.registerForm.controls['password'].value!
    }

    if(this.transactionService.createUser(user)){
      this.changeForm('login')
      Swal.fire({
        text: 'Empleado creado correctamente',
        icon:'success'
      })
    }else{
      Swal.fire({
        text: 'Ocurrió un error creando el empleado o el usuario ya existe',
        icon:'warning'
      })
    }
  }

  passwordChange(){


    if(this.changePasswordForm.controls['password'].value != this.changePasswordForm.controls['confirmPassword'].value){
      this.passwordMatch = false
    }else{
      this.passwordMatch = true
    }
  }

  passwordChangeRegister(){
    if(this.registerForm.controls['password'].value != this.registerForm.controls['confirmPassword'].value){
      this.passwordMatchRegister = false
    }else{
      this.passwordMatchRegister = true
    }
  }

  validateInput(event: any) {

    var inputValue = event.key;

    // Puedes ajustar esta expresión regular según tus necesidades
    var regex = /^[a-zA-Z0-9]*$/;

    if (!regex.test(inputValue)) {
        event.preventDefault();
    }
  }

  pasteInput(event: any){
    event.preventDefault();
  }

  async getRoles(){
    await this.transactionService.get<string[]>(endpoint,"").then((data: any) => {
      this.roles = data.positions
    })
  }
}
