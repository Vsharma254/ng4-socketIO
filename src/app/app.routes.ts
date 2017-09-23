import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { ChatComponent } from './chat';
import { LoginComponent } from './login';
import { DeparmentComponent } from './department';

import { SystemUserComponent } from './systemuser';
import { NoContentComponent } from './no-content';
import { DataResolver } from './app.resolver';
import { CanActiveGuardForRoute } from './guards/canActiveGuard';
import { CanLoadGuardForRoute } from './guards/canloadguard';

export const ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'myapp', children: [
      { path: 'about', component: AboutComponent, canActivate: [CanActiveGuardForRoute] },
      { path: 'chat', component: ChatComponent, canActivate: [CanActiveGuardForRoute] },
      { path: 'department', component: DeparmentComponent, canActivate: [CanActiveGuardForRoute] },
      { path: 'systemuser', component: SystemUserComponent, canActivate: [CanActiveGuardForRoute] },
      { path: 'detail', loadChildren: './+detail#DetailModule', canLoad: [CanLoadGuardForRoute] },
      { path: 'barrel', loadChildren: './+barrel#BarrelModule', canLoad: [CanLoadGuardForRoute] }],
    component: HomeComponent, canActivate: [CanActiveGuardForRoute]
  },
  { path: '', component: HomeComponent, canActivate: [CanActiveGuardForRoute] },
  { path: '**', component: NoContentComponent }
];
