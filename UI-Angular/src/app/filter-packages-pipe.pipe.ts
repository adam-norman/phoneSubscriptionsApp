import { Pipe, PipeTransform } from '@angular/core';
import { Packages } from './models/Packages';

@Pipe({
  name: 'filterPackagesPipe'
})
export class FilterPackagesPipePipe implements PipeTransform {

  transform(userPackages: Packages[], userPackage: number ): any {
    if (userPackage === undefined) {
      return userPackages;
    } else {
      return userPackages.filter(
        upackage => {
          if ( upackage.packageId === userPackage) {
            return upackage ;
          }
        }
      );
    }
  }

}
