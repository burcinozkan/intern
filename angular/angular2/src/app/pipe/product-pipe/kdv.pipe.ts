import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'kdv'
})
export class KdvPipe implements PipeTransform {

    transform(value: number, rate: number): number {
        return value * (1 + rate / 100);
    }
}
