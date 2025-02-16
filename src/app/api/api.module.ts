/* tslint:disable */
import {NgModule, ModuleWithProviders} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ApiConfiguration, ApiConfigurationInterface} from './api-configuration';

import {AuthenticationService} from './services/authentication.service';
import {UserManagemnetService} from './services/user-managemnet.service';


/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    AuthenticationService,
    UserManagemnetService
  ],
})
export class ApiModule {
  static forRoot(customParams: ApiConfigurationInterface): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    };
  }
}
