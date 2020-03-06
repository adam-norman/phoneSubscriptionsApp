import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PackagesComponent } from './packages/packages.component';
import { NodesComponent } from './nodes/nodes.component';
import { MonthRegistrationsComponent } from './month-registrations/month-registrations.component';
import { ErrorComponent } from './error/error.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './core/CustomMaterialModule';
import { NavigationComponent } from './navigation/navigation.component';
import { CreateNodeComponent } from './create-node/create-node.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PackagesListComponent } from './packages-list/packages-list.component';
import { FilterPackagesPipePipe } from './filter-packages-pipe.pipe';
import { SubNodesComponent } from './sub-nodes/sub-nodes.component';
import { SubNodesListComponent } from './sub-nodes-list/sub-nodes-list.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { SubNodeComponent } from './sub-node/sub-node.component';
import { SubNodesFilterPipe } from './sub-nodes-list/sub-nodes-filter.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
const appRoutes: Routes = [
  { path: 'nodes', component: NodesComponent },
  { path: 'add-nodes', component: CreateNodeComponent },
  { path: 'packages',      component: PackagesListComponent },
  { path: 'add-packages',      component: PackagesComponent},
  { path: 'add-subNodes',      component: SubNodesComponent},
  { path: 'subNodes',      component: SubNodesListComponent},
  { path: 'subNode',      component: SubNodeComponent},
  {
    path: 'registrations',
    component: MonthRegistrationsComponent,
    data: { title: 'month Registration' }
  },
  { path: '',
    redirectTo: '/registrations',
    pathMatch: 'full'
  },
  { path: '**', component: ErrorComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    PackagesComponent,
    NodesComponent,
    MonthRegistrationsComponent,
    ErrorComponent,
    NavigationComponent,
    CreateNodeComponent,
    PackagesListComponent, FilterPackagesPipePipe, SubNodesComponent, SubNodesListComponent, SubNodeComponent, SubNodesFilterPipe, ConfirmDialogComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, CustomMaterialModule, FormsModule, HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
