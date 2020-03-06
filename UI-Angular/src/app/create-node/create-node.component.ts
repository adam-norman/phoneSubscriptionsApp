import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Nodes } from '../models/nodes';
import { NodesService } from '../services/nodes.service';
import { Packages } from '../models/Packages';
import { NotificationsService } from '../services/notifications.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-create-node',
  templateUrl: './create-node.component.html',
  styleUrls: ['./create-node.component.css']
})
export class CreateNodeComponent implements OnInit {
  @Output() reload: EventEmitter<any> = new EventEmitter();
  nodeObj = new Nodes('', '', '', '', -1, '');
  packagesItems: Packages[];
  constructor(private nodeService: NodesService,private msg: NotificationsService) { }
  ngOnInit() {

    this.loadPackages();
  }
  private loadPackages() {
    this.nodeService.getPackagesList().subscribe(data => this.packagesItems = data);
  }

  onSubmit(nodesForm:NgForm) {
    this.nodeService.addNewNode(this.nodeObj).
      subscribe(
        data => {
          console.log('sucess!', data);
          this.msg.showSuccess('تم الحفظ بنجاح');
          nodesForm.reset();
          this.reload.emit(null);
       }
        ,
        error => {
          console.log('error', error)
        this.msg.showError('عفوا حدث خطأ');
      }
      );
  }
}
