import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canFly',
  standalone: true
})
export class CanFlyPipe implements PipeTransform {
  transform(heroes: any[], canFly: boolean): any[] {
    if (!heroes) return [];
    return heroes.filter(hero => hero.canFly === canFly);
  }
}
