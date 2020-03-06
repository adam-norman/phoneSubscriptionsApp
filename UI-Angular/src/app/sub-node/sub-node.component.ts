import { Component, OnInit } from '@angular/core';
import { NodesService } from '../services/nodes.service';
import { NotificationsService } from '../services/notifications.service';
import { Nodes } from '../models/Nodes';
import { SubNodes } from '../models/SubNodes';
import { Packages } from '../models/Packages';
import { DataService } from '../services/data.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-sub-node',
  templateUrl: './sub-node.component.html',
  styleUrls: ['./sub-node.component.css']
})
export class SubNodeComponent implements OnInit {
    constructor(private nodeService: NodesService,private selectedSubNodeObj: DataService,
                private msg: NotificationsService,private router: Router
       ) { 

         
       }
    nodesList: Nodes[];
    subNodesList: SubNodes[];
    packagesItems: Packages[];
    subNodeObj = <SubNodes>this.selectedSubNodeObj.selectedObj;
    ngOnInit() {
      this.loadPackages();
    }
    onSubmit() {
      console.log(this.subNodeObj);
      this.nodeService.updateSubNode(this.subNodeObj).
        subscribe(
          data => {
            this.msg.showSuccess('تم الحفظ');
            this.subNodeObj = {};
            this.router.navigateByUrl('subNodes');
          },
          error => {
            console.log(error);
            this.msg.showError('عفوا حدث خطأ');
          }
        );
    }
  
    private loadPackages() {
      this.nodeService.getPackagesList().subscribe(data => {this.packagesItems = data;
        this.nodesLoad();
      });
    }
    nodesLoad() {
      this.nodeService.getNodesList()
        .subscribe(res =>{
          
          this.nodesList = res;
          this.selectedSubNodeObj.selectedObj.subscribe(message => this.subNodeObj = <SubNodes>message);
        }
          
          );
    }
  

}
