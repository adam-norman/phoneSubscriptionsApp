import { Component, OnInit, ViewChild } from '@angular/core';
import { NodesService } from '../services/nodes.service';
import { Packages } from '../models/Packages';
import { NotificationsService } from '../services/notifications.service';
import { NgForm } from '@angular/forms';
import { PackagesListComponent } from '../packages-list/packages-list.component';
@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})

export class PackagesComponent implements OnInit {
  @ViewChild(PackagesListComponent, {static: false}) _childPackagesList:PackagesListComponent;

  packageObj = new Packages(-1, '', 0);
  AddNewToggler=true;
  constructor(private nodeService: NodesService,private msg: NotificationsService) { }

  ngOnInit() {
  }
  onSubmit(packagesForm:NgForm) {
    console.log(this.packageObj);
    this.nodeService.addNewPackage(this.packageObj).
      subscribe(
        data => {
          console.log('sucess!', data);
          this.msg.showSuccess('تم الحفظ بنجاح');
          packagesForm.reset();
          this._childPackagesList.loadPackages();
       }
        ,
        error => {
          console.log('error', error)
          this.msg.showError('عفوا حدث خطأ');
       }
      );
    // this.submitted = true;
  }
  changeAddNewToggler(){
    this.AddNewToggler=!this.AddNewToggler;
  }
}
