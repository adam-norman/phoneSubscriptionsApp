import { Component, OnInit } from '@angular/core';
import { NodesService } from '../services/nodes.service';
import { Packages } from '../models/Packages';
import { Nodes } from '../models/Nodes';
import { SubNodes } from '../models/SubNodes';
import { NotificationsService } from '../services/notifications.service';


@Component({
  selector: 'app-sub-nodes',
  templateUrl: './sub-nodes.component.html'
})
export class SubNodesComponent implements OnInit {
  constructor(private nodeService: NodesService,
              private msg: NotificationsService
     ) { }
  nodesList: Nodes[];
  subNodesList: SubNodes[];
  packagesItems: Packages[];
  subNodeObj = new SubNodes('', '', '', new Date(), '', '', -1, -1, -1);
  ngOnInit() {
    this.loadPackages();
    this.nodesLoad();
  }
  onSubmit() {
    console.log(this.subNodeObj);
    this.nodeService.addNewSubNode(this.subNodeObj).
      subscribe(
        data => {
          this.msg.showSuccess('تم الحفظ');
          this.subNodeObj = {};
        },
        error => {
          console.log(error);
          this.msg.showError('عفوا حدث خطأ');
        }
      );
  }

  private loadPackages() {
    this.nodeService.getPackagesList().subscribe(data => this.packagesItems = data);
  }
  nodesLoad() {
    this.nodeService.getNodesList()
      .subscribe(res =>
        this.nodesList = res);
  }

}
