import { Component, OnInit } from '@angular/core';
import { NodesService } from '../services/nodes.service';
import { Nodes } from '../models/Nodes';
import { Packages } from '../models/Packages';
import { FilterPackagesPipePipe } from '../filter-packages-pipe.pipe';
import { NotificationsService } from '../services/notifications.service';
@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.css'],
  providers: [ FilterPackagesPipePipe ]
})
export class NodesComponent implements OnInit {
  AddNewToggler=true;
  nodesList: Nodes[];
  packagesItems: Packages[];
  constructor(private nodeService: NodesService, 
    private filterPackagesPipe: FilterPackagesPipePipe,private msg: NotificationsService) { }
  ngOnInit() {
    this.loadPackages();
    this.nodesLoad();
  }
  nodesLoad() {
     this.nodeService.getNodesList()
    .subscribe(res =>
      this.nodesList = res);
  }
  private loadPackages() {
    this.nodeService.getPackagesList().subscribe(data => this.packagesItems = data);
  }
  saveContact(e: any, nodeObj: Nodes) {
   this.nodeService.updateNode(nodeObj).
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

  deleteContact(e: any, nodeObj: Nodes) {
    this.nodeService.deleteNode(nodeObj).
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
   changeAddNewToggler(){
     this.AddNewToggler=!this.AddNewToggler;
   } 
}
