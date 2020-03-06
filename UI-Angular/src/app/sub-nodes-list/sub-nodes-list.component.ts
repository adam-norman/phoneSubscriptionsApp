import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';
import { NodesService } from '../services/nodes.service';
import { FilterPackagesPipePipe } from '../filter-packages-pipe.pipe';
import { Nodes } from '../models/Nodes';
import { Packages } from '../models/Packages';
import { SubNodes } from '../models/SubNodes';
import { RouterModule, Routes, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { SubNodesFilterPipe } from './sub-nodes-filter.pipe';

@Component({
  selector: 'app-sub-nodes-list',
  templateUrl: './sub-nodes-list.component.html',
  styleUrls: ['./sub-nodes-list.component.css'],
  providers: [FilterPackagesPipePipe,SubNodesFilterPipe]
})
export class SubNodesListComponent implements OnInit {
  nodesList: Nodes[];
  subNodesList: SubNodes[];
  packagesItems: Packages[];
  nodeId: number;
  AddNewToggler = true;
  searchCtrPlaceHolder = 'اختر معيار البحث اولا';
  searchFilter: string;
  searchFilterValue: string;
  searchFilterSelected = false;
  constructor(private nodeService: NodesService, private selectedSubNodeObj: DataService,
    private filterPackagesPipe: FilterPackagesPipePipe, private msg: NotificationsService,
    private router: Router) { }

  ngOnInit() {
    console.log(this.selectedSubNodeObj.nodeId);
    this.nodeId = +this.selectedSubNodeObj.nodeId;
    this.loadPackages();
    this.nodesLoad();
    let subnode: SubNodes = { nodeId: this.nodeId };
    this.subNodesLoad(subnode);
  }
  private loadPackages() {
    this.nodeService.getPackagesList().subscribe(data => this.packagesItems = data);
  }
  nodesLoad() {
    this.nodeService.getNodesList()
      .subscribe(data => {
        this.nodesList = data;
        //console.table(data);
      });
  }
  subNodesLoad(subNode: SubNodes) {
    //debugger;
    this.nodeService.getSubNodesListNodeId(subNode)
      .subscribe(res =>
        this.subNodesList = res);
  }
  selectContact(e: any, nodeObj: Nodes) {
    this.selectedSubNodeObj.sendObj(nodeObj);
    this.selectedSubNodeObj.rememberNodeId(this.nodeId)
    this.router.navigateByUrl('subNode');

  }
  deleteContact(e: any, subNodeObj: SubNodes) {
    this.nodeService.deleteSubNode(subNodeObj).
      subscribe(
        data => {
          console.log('sucess!', data);
          this.onOptionsSelected()
          this.msg.showSuccess('تم الحذف بنجاح');
        }
        ,
        error => {
          console.log('error', error);
          this.msg.showError('حدث خطأ');
        }
      );
  }
  onOptionsSelected() {
    let subnode: SubNodes = { nodeId: this.nodeId };
    this.subNodesLoad(subnode);
  }
  changeAddNewToggler() {
    this.AddNewToggler = !this.AddNewToggler;
  }
 
}
