import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TransactionService } from './core/transaction.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    const transactionServiceObj = jasmine.createSpyObj('TransactionService',['setUsersListToLocalStorage'])
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{provide: TransactionService, useValue: transactionServiceObj}]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'EmployeesAdmin' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('EmployeesAdmin');
  });

});
