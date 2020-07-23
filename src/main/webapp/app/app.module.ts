import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { RfbloyaltySharedModule } from 'app/shared/shared.module';
import { RfbloyaltyCoreModule } from 'app/core/core.module';
import { RfbloyaltyAppRoutingModule } from './app-routing.module';
import { RfbloyaltyHomeModule } from './home/home.module';
import { RfbloyaltyEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    RfbloyaltySharedModule,
    RfbloyaltyCoreModule,
    RfbloyaltyHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    RfbloyaltyEntityModule,
    RfbloyaltyAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class RfbloyaltyAppModule {}
