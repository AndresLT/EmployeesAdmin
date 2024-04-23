import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'active',
  standalone: true
})
export class ActivePipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): unknown {
    if(value){
      return 'Activo'
    }else{
      return 'Inactivo'
    }
  }

}
