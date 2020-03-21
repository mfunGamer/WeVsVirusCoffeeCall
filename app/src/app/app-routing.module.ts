import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'legal-notice',
    loadChildren: () => import('./legal-notice/legal-notice.module').then( m => m.LegalNoticePageModule)
  },
  {
    path: 'data-protection',
    loadChildren: () => import('./data-protection/data-protection.module').then( m => m.DataProtectionPageModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
    path: 'reward-history',
    loadChildren: () => import('./reward-history/reward-history.module').then( m => m.RewardHistoryPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
