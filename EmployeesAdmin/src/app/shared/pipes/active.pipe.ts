import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'active',
  standalone: true
})
export class ActivePipe implements PipeTransform {

  // Pipe creado para transformar un booleano en texto
  // en este caso, true significa que un usuario está activo
  // y false significa que un usuario está inactivo
  transform(value: boolean, ...args: unknown[]): unknown {
    if(value){
      return 'Activo'
    }else{
      return 'Inactivo'
    }
  }

}
