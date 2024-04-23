import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalService } from '../local.service';
import { User } from '../Model/User';

// Guard creado para limitar el acceso al modulo de administracion
// unicamente para aquellos usuarios con rol de sw admin
export const adminGuard: CanActivateFn = (route, state) => {
  const user: User = JSON.parse(inject(LocalService).getData('user'))
  const router = inject(Router)
  if(user.role === 'sw admin'){
    return true;
  }else{
    router.navigate(['dashboard'])
    return false;
  }
};
