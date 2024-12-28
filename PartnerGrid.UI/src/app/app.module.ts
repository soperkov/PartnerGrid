import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PartnerListComponent } from './components/partner-list/partner-list.component'
import { PartnerDetailComponent } from './components/partner-detail/partner-detail.component';
import { PartnerCreateComponent } from './components/partner-create/partner-create.component';
import { PartnerEditComponent } from './components/partner-edit/partner-edit.component';
import { PolicyListModalComponent } from './components/policy-list-modal/policy-list-modal.component';
import { PolicyFormComponent } from './components/policy-form/policy-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PartnerListComponent,
    PartnerDetailComponent,
    PartnerCreateComponent,
    PartnerEditComponent,
    PolicyListModalComponent,
    PolicyFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
