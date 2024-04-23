import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../core/Model/User';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { TitleCasePipe } from '@angular/common';
import { endpoint } from '../../core/environment/environment';
import { TransactionService } from '../../core/transaction.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import Swal from 'sweetalert2'
import { LocalService } from '../../core/local.service';


@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [MatDialogContent, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule,ReactiveFormsModule, MatButtonModule, MatDatepickerModule, MatSelectModule, TitleCasePipe, MatDialogModule, MatCheckboxModule],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent implements OnInit {

  hidePass = true;

  roles: string[] = []

  showCheck = false

  createForm = new FormGroup({
    user: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  })

  updateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    active: new FormControl(false),
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: User, private transactionService: TransactionService, public dialogRef: MatDialogRef<UserDialogComponent>, private localService: LocalService){
  }
  async ngOnInit(): Promise<void> {
    await this.getRoles()
    this.pupulateUpdateForm()
    this.setSelftUpdate()
  }

  async getRoles(){
    await this.transactionService.get<string[]>(endpoint,"").then((data: any) => {
      this.roles = data.positions
    })
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

  pupulateUpdateForm(){
    this.updateForm.get('name')?.setValue(this.data.name!)
    this.updateForm.get('lastName')?.setValue(this.data.lastName!)
    this.updateForm.get('role')?.setValue(this.data.role!)
    this.updateForm.get('birthDate')?.setValue(this.data.birthDate?.toString()!)
    this.updateForm.get('active')?.setValue(this.data.active!)
  }

  createUser(){
    let user: User = {
      name: this.createForm.get('name')?.value!,
      lastName: this.createForm.get('lastName')?.value!,
      role: this.createForm.get('role')?.value!,
      birthDate: new Date(this.createForm.get('birthDate')?.value!),
      active: true,
      pass: this.createForm.get('pass')?.value!,
      user: this.createForm.get('user')?.value!,
    }

    if(this.transactionService.createUser(user)){
      Swal.fire({
        text: 'Empleado creado correctamente',
        icon:'success'
      })
      this.dialogRef.close()
    }else{
      Swal.fire({
        text: 'Error creando empleado. Verificar que no exista.',
        icon:'warning'
      })
    }
  }

  updateUser(){
    let user: User = {
      name: this.updateForm.get('name')?.value!,
      lastName: this.updateForm.get('lastName')?.value!,
      role: this.updateForm.get('role')?.value!,
      birthDate: new Date(this.updateForm.get('birthDate')?.value!),
      active: this.updateForm.get('active')?.value!,
      pass: this.data.pass,
      user: this.data.user
    }
    if(this.transactionService.updateUser(user)){
      Swal.fire({
        text: 'Empleado actualizado correctamente',
        icon:'success'
      })
      this.dialogRef.close()
      if(this.data.user === JSON.parse(this.localService.getData('user')).user){
        window.location.reload()
      }
    }else{
      Swal.fire({
        text: 'Error actualizando empleado',
        icon:'warning'
      })
    }
  }

  setSelftUpdate(){
    if(this.data.user === JSON.parse(this.localService.getData('user')).user){
      this.showCheck = false
    }else{
      this.showCheck = true
    }
  }
}
