import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'carFilterPipe'
})
export class CarFilterPipePipe implements PipeTransform {

  transform(value: Car[], carFilter: string): Car[] {
    carFilter = carFilter ? carFilter.toLocaleLowerCase():'';
    
    return carFilter ? value.filter((c:Car) =>
      c.brandName.toLocaleLowerCase().indexOf(carFilter) !== -1 ||
      c.colorName.toLocaleLowerCase().indexOf(carFilter) !== -1 ||
      c.dailyPrice.toString().indexOf(carFilter) !== -1 ||
      c.description.toLocaleLowerCase().indexOf(carFilter) !== -1 ||
      c.modelYear.toString().indexOf(carFilter) !== -1
    ):value;
  }

}
