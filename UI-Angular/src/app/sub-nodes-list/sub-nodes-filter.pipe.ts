import { Pipe, PipeTransform } from '@angular/core';
import { SubNodes } from '../models/SubNodes';

@Pipe({
  name: 'subNodesFilterPipe' 
})
export class SubNodesFilterPipe implements PipeTransform {

  transform(SubNodesArr: SubNodes[], searchParam: string): unknown {
    if (searchParam === undefined) {
      return SubNodesArr;
    } else {
      return SubNodesArr.filter(
        subNode => {
          if ( subNode.phone.includes(searchParam) || subNode.fullName.toLowerCase().includes(searchParam.toLowerCase()) ) {
            return subNode ;
          }
        }
      );
    }
  }

}
