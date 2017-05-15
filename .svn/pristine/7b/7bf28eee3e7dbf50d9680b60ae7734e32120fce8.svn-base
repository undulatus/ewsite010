// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { BaseRequestOptions } from '@angular/http';

//// services & components
// application
import { AppComponent } from './app.component';
import { routing, routedComponents } from './app.routing.module';
import { NotificationModalComponent } from './modal/index';
import { ProfileDropdownComponent } from "./ui/index";
import { ActivityBreakdownComponent } from './worksheet/index';
import { ActivitySummaryComponent } from './worksheet/index';
import { DeleteModalComponent } from './modal/index';
/*import { HomePageModule } from './home/home.module';*/
import { GlobalEventsService } from "./utils/index";
import { AuthGuard, AuthenticationService, AuthModule } from './guard/index';
import { OpportunityListService } from './dashboard/opportunity.service';
// libraries
import { WaveComponent } from 'ng2-spin-kit/app/spinner/wave';

//// UI
// application
import { MainNavBarComponent } from './ui/index';
import { MyDatePickerModule } from 'mydatepicker';

// datatables
import { DataTablesModule } from 'angular-datatables';
// bootstrap
import { AlertModule } from 'ng2-bootstrap/alert';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { AccordionModule } from 'ng2-bootstrap/accordion';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { ModalModule } from 'ng2-bootstrap/modal';

// libraries
import { LocalStorageModule } from 'angular-2-local-storage';

// fake backend
//import { fakeBackendProvider } from './utils/fake-backend';
//import { MockBackend, MockConnection } from '@angular/http/testing';

@NgModule({
  declarations: [
    AppComponent,
    NotificationModalComponent,
    WaveComponent,
    ActivityBreakdownComponent,
    ActivitySummaryComponent,
    DeleteModalComponent,
    MainNavBarComponent,
    ProfileDropdownComponent,
    routedComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    
    routing,
    AuthModule,

    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    DataTablesModule,
    MyDatePickerModule,
    ModalModule.forRoot(),
    
    LocalStorageModule.withConfig({
      prefix: 'ew-app',
      storageType: 'localStorage'
    })
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    GlobalEventsService,

    // fakeBackendProvider,
    // MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
 /* constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }*/
}
