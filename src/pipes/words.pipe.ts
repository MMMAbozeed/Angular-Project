import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'words',
  standalone: true
})
export class WordsPipe implements PipeTransform {

  transform(value: string, limit: number = 100): string {
    if (!value) {
      return '';
    }

    const words = value.split(' ');
    if (words.length <= limit) {
      return value;
    }

    const truncated = words.slice(0, limit).join(' ') + '...';
    return truncated;
  }


}
