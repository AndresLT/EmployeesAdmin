import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalService } from '../local.service';

// Guard creado para no permitir que un usuario loggeado
// salga a la pantalla de inicio de sesión
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
