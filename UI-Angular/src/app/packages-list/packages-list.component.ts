import { Component, OnInit } from '@angular/core';
import { NodesService } from '../services/nodes.service';
import { Packages } from '../models/Packages';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-packages-list',
  templateUrl: './packages-list.component.html',
  styleUrls: ['./packages-list.component.css']
})
export class PackagesListComponent implements OnInit {

  constructor(private nodeService: NodesService,private msg: NotificationsService) { }
  packagesItems: Packages[];
  ngOnInit() {
    this.loadPackages();

  }
 loadPackages() {
    this.nodeService.getPackagesList().subscribe(data => this.packagesItems = data);
  }
  saveContact(e: any, packageObj: Packages) {
    this.nodeService.updatePackage(packageObj).
       subscribe(
         data => {
           console.log('sucess!', data);
           this.msg.showSuccess('تم الحفظ');
       }
         ,
         error => {
           console.log('error', error);
       }
       );
   }
 
   deleteContact(e: any, packageObj: Packages) {
     this.nodeService.deletePackage(packageObj).
        subscribe(
          data => {
           console.log('sucess!', data);
           this.msg.showSuccess('تم الحذف بنجاح');
        }
        ,
          error => {
            console.log('error', error);
            this.msg.showSuccess('حدث خطأ');
           }
        );
    }
 
}
