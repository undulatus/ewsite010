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
import { RlTagInputModule } from 'angular2-tag-input';

// datatables
import { DataTablesModule } from 'angular-datatables';
// bootstrap
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// libraries
import { LocalStorageModule } from 'angular-2-local-storage';
import { provideAuth } from "angular2-jwt/angular2-jwt";
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
    RlTagInputModule,
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    DataTablesModule,
    ModalModule.forRoot(),


    TooltipModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: 'ew-app',
      storageType: 'localStorage'
    })
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    GlobalEventsService,
    // provideAuth({
    //   noJwtError: true,
    // }),
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
