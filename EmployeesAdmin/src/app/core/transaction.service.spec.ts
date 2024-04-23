import { TestBed } from '@angular/core/testing';

import { TransactionService } from './transaction.service';
import { HttpClientModule } from '@angular/common/http';
import { User, UsersList } from './Model/User';
import { LocalService } from './local.service';
import { endpoint } from './environment/environment';

describe('TransactionService', () => {
  let service: TransactionService;
  let localService: LocalService
  let usersList = [...UsersList]
  beforeEach(() => {
    usersList = [...UsersList]
    localService = new LocalService()
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{provide: LocalService, useValue: {
                    getData: () => JSON.stringify(usersList),
                    saveData: () => {},
                    removeData: () => {}
                  }}]
    });

    service = TestBed.inject(TransactionService);
    service.usersList = usersList
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login correctly', () =>{
    service.usersList[0].active = true
    let user: User = {user: 'alozano', name: 'name', lastName: 'lastName', role: 'role', birthDate: new Date(), pass: '1234', active: true}
    expect(service.login(user)).toBeTruthy()
  })

  it('should not login', () =>{
    service.usersList[0].active = true
    let user: User = {user: 'alozano', name: 'name', lastName: 'lastName', role: 'role', birthDate: new Date(), pass: '12345', active: true}
    expect(service.login(user)).toBeFalsy()
  })

  it('should logout correctly', () => {
    expect(service.logout()).toBeTruthy()

  })

  it('should return the users list', () => {
    let expected = JSON.parse(JSON.stringify(usersList))
    expect(service.getUserList()).toEqual(expected)

  })

  it('slould create new user. it must add a new user to the list', () =>{
    let user: User = {user: 'userTest', name: 'name', lastName: 'lastName', role: 'role', birthDate: new Date(), pass: '1234', active: true}
    expect(service.createUser(user)).toBeTruthy()
    expect(service.usersList.length).toEqual(3)
  })

  it('slould not create new user. Passing an existing user', () =>{
    let user: User = {user: 'alozano', name: 'name', lastName: 'lastName', role: 'role', birthDate: new Date(), pass: '1234', active: true}
    expect(service.createUser(user)).toBeFalsy()
    expect(service.usersList.length).toEqual(usersList.length)
  })

  it('should change user password correctly', () => {
    let user: User = {user: 'alozano', name: 'name', lastName: 'lastName', role: 'role', birthDate: new Date(), pass: '1234', active: true}
    expect(service.updatePassword(user)).toBeTruthy()
    expect(service.usersList.find( x => x.user === user.user)?.pass).toEqual(user.pass)
  })

  it('should not change user password. The user doesnt exists', () => {
    let user: User = {user: 'test', name: 'name', lastName: 'lastName', role: 'role', birthDate: new Date(), pass: '1234', active: true}
    expect(service.updatePassword(user)).toBeFalsy()
  })

  it('should update user', () => {
    let user: User = {user: 'alozano', name: 'name', lastName: 'lastName', role: 'role', birthDate: new Date(), pass: '1234', active: true}
    expect(service.updateUser(user)).toBeTruthy()
    expect(service.usersList.find( x => x.user === user.user)).toEqual(user)
  })

  it('should not update user', () => {
    let user: User = {user: 'test', name: 'name', lastName: 'lastName', role: 'role', birthDate: new Date(), pass: '1234', active: true}
    expect(service.updateUser(user)).toBeFalsy()
  })

  it('should update role', () => {
    let user: User = {user: 'alozano', name: 'name', lastName: 'lastName', role: 'role', birthDate: new Date(), pass: '1234', active: true}
    expect(service.updateRole(user.user, user.role!)).toBeTruthy()
    expect(service.usersList.find( x => x.user === user.user)?.role).toEqual(user.role)
  })

  it('should not update role', () => {
    let user: User = {user: 'test', name: 'name', lastName: 'lastName', role: 'role', birthDate: new Date(), pass: '1234', active: true}
    expect(service.updateRole(user.user, user.role!)).toBeFalsy()
  })

  it('should abandos company', () => {
    let user: User = {user: 'alozano', name: 'name', lastName: 'lastName', role: 'role', birthDate: new Date(), pass: '1234', active: true}
    expect(service.abandon(user.user)).toBeTruthy()
    expect(service.usersList.find( x => x.user === user.user)?.active).toBeFalsy()
  })

  it('should request positions as a promise from API', (done: DoneFn) => {
    service.get(endpoint,'').then((result: any) => {
      expect(result.positions.length).toEqual(6)
      done()
    })
  })
});
