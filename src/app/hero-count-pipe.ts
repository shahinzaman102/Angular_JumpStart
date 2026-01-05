import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from './hero.model';

@Pipe({
  name: 'heroCount',
  standalone: true
})
export class HeroCountPipe implements PipeTransform {
  transform(heroes: Hero[]): number {
    return heroes?.length ?? 0;
  }
}
