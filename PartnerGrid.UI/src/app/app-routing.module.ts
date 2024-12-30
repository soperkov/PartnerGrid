import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerListComponent } from './components/partner-list/partner-list.component';
import { PartnerCreateComponent } from './components/partner-create/partner-create.component';
import { PartnerEditComponent } from './components/partner-edit/partner-edit.component';

const routes: Routes = [
  { path: 'partners', component: PartnerListComponent },
  { path: 'partners/create', component: PartnerCreateComponent },
  { path: 'partners/edit/:id', component: PartnerEditComponent },
  { path: '', redirectTo: '/partners', pathMatch: 'full' },
  { path: '**', redirectTo: '/partners' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
