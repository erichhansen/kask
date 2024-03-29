import {AdminGuard} from '../guards/admin';
import {GUARDS, LoggedInGuard} from '../guards';
import {ALL_PROVIDERS} from '../services';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../components/';
import {SharedModule} from './shared.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    SharedModule,
    RouterModule.forRoot(
        [
            { path: '', loadChildren: './+dashboard.module.ts#LazyDashboardModule' },
            { path: 'admin', canActivate: [AdminGuard], loadChildren: './+admin.module.ts#LazyAdminModule' },
            { path: 'stats', loadChildren: './+stats.module.ts#LazyStatsModule' },
            // { path: 'votes', canActivate: [LoggedInGuard], loadChildren: './+votes.module.ts#LazyVotesModule' },
            { path: 'info', loadChildren: './+info.module.ts#LazyInfoModule' },
            // { path: 'user', canActivate: [LoggedInGuard], loadChildren: './+user.module.ts#LazyUserModule'}
        ]
    )
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
      ...ALL_PROVIDERS,
      ...GUARDS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
