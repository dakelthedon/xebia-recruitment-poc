import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { CartComponent } from './cart/cart.component';
import { CatalogComponent } from './catalog/catalog.component';
import {OfferService} from './offer.service';
import {ProductService} from './product.service';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    CartComponent,
    CatalogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      [
        {path: '', component: CatalogComponent, pathMatch: 'full'},
        {path: 'catalog', component: CatalogComponent, pathMatch: 'full'},
        {path: 'cart', component: CartComponent, pathMatch: 'full'},
        {path: 'detail/:isbn', component: DetailComponent, pathMatch: 'full'},
        {path: '**', redirectTo: '', pathMatch: 'full'}
      ],
      {useHash: true}
    )
  ],

  providers: [
    OfferService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
