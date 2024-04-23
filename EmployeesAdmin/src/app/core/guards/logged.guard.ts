import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalService } from '../local.service';

export const loggedGuard: CanActivateFn = (route, state) => {
  let user
  try{
    user = JSON.parse(inject(LocalService).getData('user'))
  }catch{
    user = null
  }
  const router = inject(Router)
  if(user){
    router.navigate(['dashboard'])
    return false;
  }else{
    return true;
  }
};
