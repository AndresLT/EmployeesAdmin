import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { TransactionService } from '../../core/transaction.service';
import { User } from '../../core/Model/User';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivePipe } from '../../shared/pipes/active.pipe';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatPaginator,DatePipe, TitleCasePipe,FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, ActivePipe, MatDialogModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements AfterViewInit {

  usersList: User[] = []

  displayedColumns: string[] = ['user','name', 'lastName', 'birthDate', 'role', 'active', 'update'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filter = new FormControl('');

  constructor(private transactionService: TransactionService, public dialog: MatDialog){
    this.usersList = this.transactionService.getUserList()
    console.log(this.usersList);

    this.dataSource = new MatTableDataSource(this.usersList);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(user?: User){
    let newUser: User = {user: "", pass: ""}
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: user ? user : newUser
    });
    dialogRef.afterClosed().subscribe(result => {
      this.usersList = this.transactionService.getUserList()
      this.dataSource = new MatTableDataSource(this.usersList);
    })
  }
}
