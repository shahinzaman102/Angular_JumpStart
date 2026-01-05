import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heroCount',
  standalone: true
})
export class HeroCountPipe implements PipeTransform {
  transform(heroes: any[]): number {
    return heroes?.length ?? 0;
  }
}
