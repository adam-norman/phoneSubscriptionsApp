import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { NodesComponent } from './app/nodes/nodes.component';
import { PackagesComponent } from './app/packages/packages.component';
import { MonthRegistrationsComponent } from './app/month-registrations/month-registrations.component';
import { ErrorComponent } from './app/error/error.component';



if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
