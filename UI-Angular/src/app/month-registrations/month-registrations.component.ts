import { Component, OnInit } from '@angular/core';
import { NodesService } from '../services/nodes.service';
import { NotificationsService } from '../services/notifications.service';
import { Nodes } from '../models/Nodes';
import { SubNodes } from '../models/SubNodes';
import { Packages } from '../models/Packages';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ColPreferences } from '../models/colPreferences';
import { MatDialog } from '@angular/material';
import { ConfirmDialogModel } from '../models/ConfirmDialogModel';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-month-registrations',
  templateUrl: './month-registrations.component.html',
  styleUrls: ['./month-registrations.component.css']
})
export class MonthRegistrationsComponent implements OnInit {
  displayedColumns = [];
  showColPreferences = true;
  AllColumns =
    ['fullName', 'phone', 'cjan', 'cfeb',
      'cmar',
      'capr',
      'cmay',
      'cjun',
      'cjul',
      'caug',
      'csep',
      'coct',
      'cnov',
      'cdec', 'save']
  nodesList: Nodes[];
  subNodesList: SubNodes[];
  packagesItems: Packages[];
  nodeId: number;
  colPrefDialogData: ColPreferences[] = [];
  dataSource = new MatTableDataSource<SubNodes>(this.subNodesList);
  selection = new SelectionModel<SubNodes>(true, []);
  result: string='';
  constructor(private nodeService: NodesService,public dialog: MatDialog,
    private msg: NotificationsService) { }

  ngOnInit() {
    this.loadColPref();
    this.displayedColumns = Array.from(this.AllColumns);
    this.loadPackages();
    this.nodesLoad();
    let subnode: SubNodes = { nodeId: this.nodeId };
    this.subNodesLoad(subnode);
  }
  loadColPref() {


    this.colPrefDialogData = [{
      'name': 'يناير',
      'id': 'cjan',
      'val': 1
    },
    {
      'name': 'فبراير',
      'id': 'cfeb',
      'val': 1
    },
    {
      'name': 'مارس',
      'id': 'cmar',
      'val': 1
    },
    {
      'name': 'ابريل',
      'id': 'capr',
      'val': 1
    },
    {
      'name': 'مايو',
      'id': 'cmay',
      'val': 1
    },
    {
      'name': 'يونيو',
      'id': 'cjun',
      'val': 1
    },
    {
      'name': 'يوليو',
      'id': 'cjul',
      'val': 1
    },
    {
      'name': 'اغسطس',
      'id': 'caug',
      'val': 1
    },
    {
      'name': 'سبتمبر',
      'id': 'csep',
      'val': 1
    },
    {
      'name': 'اكتوبر',
      'id': 'coct',
      'val': 1
    },
    {
      'name': 'نوفمبر',
      'id': 'cnov',
      'val': 1
    },
    {
      'name': 'ديسمبر',
      'id': 'cdec',
      'val': 1
    }
    ]

  }
  private loadPackages() {
    this.nodeService.getPackagesList().subscribe(data => this.packagesItems = data);
  }
  nodesLoad() {
    this.nodeService.getNodesList()
      .subscribe(data => {
        this.nodesList = data;
      });
  }
  onOptionsSelected() {
    let subnode: SubNodes = { nodeId: this.nodeId };
    this.subNodesLoad(subnode);
  }
  subNodesLoad(subNode: SubNodes) {
    //debugger;
    this.nodeService.getSubNodesListNodeId(subNode)
      .subscribe(res =>
        this.subNodesList = res);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  save(subNodeObj: SubNodes) {
    console.table(subNodeObj);
    this.nodeService.updateSubNodeMonth(subNodeObj).
      subscribe(
        data => {
          this.msg.showSuccess('تم الحفظ');
        },
        error => {
          console.log(error);
          this.msg.showError('عفوا حدث خطأ');
        }
      );
  }
  saveContact() {
     
    this.nodeService.resetSubNodeMonth().
      subscribe(
        data => {
          this.msg.showSuccess('تم الحفظ');
        },
        error => {
          console.log(error);
          this.msg.showError('عفوا حدث خطأ');
        }
      );
  }
  savePreferences() {

    this.colPrefDialogData.forEach(element => {
        var index = this.displayedColumns.indexOf(element.id); // get index if value found otherwise -1
        if (index > -1) { //if found
          this.displayedColumns.splice(index, 1);
        }
    });

    this.colPrefDialogData.forEach(element => {
      if (element.val == 1) {
        this.displayedColumns.splice(this.displayedColumns.length-1 ,0, element.id);
      }
    });
    this.showColPreferences = !this.showColPreferences;
    console.table(this.displayedColumns);
  }
  showPreferences() {
    this.showColPreferences = !this.showColPreferences;
  }
  confirmDialog(): void {
    const message = `هل ترغب فعلا بحذف تسجيلات الشهور لجميع المشتركين?`;
 
    const dialogData = new ConfirmDialogModel("تأكيد", message);
 
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (+this.result==1)
      {
      this.saveContact()
    }
    });
  }
}
