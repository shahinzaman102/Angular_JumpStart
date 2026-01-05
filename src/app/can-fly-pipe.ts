import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from './hero.model';

@Pipe({
  name: 'canFly',
  standalone: true
})
export class CanFlyPipe implements PipeTransform {
  transform(heroes: Hero[] | null, canFly: boolean): Hero[] {
    if (!heroes) {
      return [];
    }

    return heroes.filter(hero => hero.canFly === canFly);
  }
}
