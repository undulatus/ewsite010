import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { LocalStorageService } from 'angular-2-local-storage';

export function authHttpServiceFactory(http: Http, options: RequestOptions, storageService: LocalStorageService) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'ew-site:token',
    globalHeaders: [{'Content-Type':'application/json'}]
  }), http, options);
}

@NgModule({
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ]
})
export class AuthModule {}