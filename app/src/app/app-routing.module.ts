import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)},
  {
    path: 'create-account',
    loadChildren: () => import('./pages/create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
    path: 'legal-notice',
    loadChildren: () => import('./pages/legal-notice/legal-notice.module').then( m => m.LegalNoticePageModule)
  },
  {
    path: 'reward-history',
    loadChildren: () => import('./pages/reward-history/reward-history.module').then( m => m.RewardHistoryPageModule)
  },
  {
    path: 'data-protection',
    loadChildren: () => import('./pages/data-protection/data-protection.module').then( m => m.DataProtectionPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'company-info',
    loadChildren: () => import('./pages/company-info/company-info.module').then( m => m.CompanyInfoPageModule)
  },
  {
    path: 'thank-you',
    loadChildren: () => import('./pages/thank-you/thank-you.module').then( m => m.ThankYouPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
