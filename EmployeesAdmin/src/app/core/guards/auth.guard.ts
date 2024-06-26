import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalService } from '../local.service';

// Guard creado para permitir acceso a los módulos
// unicamente cuando exista un usuario loggeado
export const authGuard: CanActivateFn = (route, state) => {
  let user
  try{
    user = JSON.parse(inject(LocalService).getData('user'))
  }catch{
    user = null
  }
  const router = inject(Router)
  if(user){
    return true;
  }else{
    router.navigate([''])
    return false;
  }
};
