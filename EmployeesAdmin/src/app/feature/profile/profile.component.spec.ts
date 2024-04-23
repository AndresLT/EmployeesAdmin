import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { TransactionService } from '../../core/transaction.service';
import { LocalService } from '../../core/local.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let localService: LocalService
  const transactionServiceObj = jasmine.createSpyObj('TansactionService', [''])
  const localServiceObj = jasmine.createSpyObj('LocalService', ['getData'])
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent, BrowserAnimationsModule],
      providers: [{provide: TransactionService, useValue: transactionServiceObj},
                  {provide: LocalService, useValue: {
                    getData: () => '{"user":"testUser","name":"testName","lastName":"testLastName","birthDate":"2024-04-15T05:00:00.000Z","role":"help desk","pass":"1234","active":true}'
                  }}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    localService = TestBed.inject(LocalService)

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
