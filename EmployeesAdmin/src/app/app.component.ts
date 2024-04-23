import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionService } from './core/transaction.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  transactionService = inject(TransactionService)
  ngOnInit(): void {
    this.transactionService.setUsersListToLocalStorage()
  }
  title = 'EmployeesAdmin';
}
