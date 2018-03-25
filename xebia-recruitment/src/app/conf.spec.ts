import {CatalogComponent} from "./catalog/catalog.component";
import {DetailComponent} from "./detail/detail.component";
import {AppComponent} from "./app.component";
import {PricePipe} from "./price.pipe";
import {CartComponent} from "./cart/cart.component";
import {TitlePipe} from "./title.pipe";
import {GroupbyPipe} from "./groupby.pipe";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterTestingModule} from "@angular/router/testing";
import {TestBed} from "@angular/core/testing";
import {ProductService} from "./product.service";
import {OfferService} from "./offer.service";
import {CartService} from "./cart.service";

export const TESTING_MODULE_CONFIG: any = {
  declarations: [
    AppComponent,
    DetailComponent,
    CartComponent,
    CatalogComponent,
    GroupbyPipe,
    TitlePipe,
    PricePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterTestingModule
  ],
  providers: [
    OfferService,
    ProductService,
    CartService
  ],
  bootstrap: [AppComponent]
}

export function testingConfig(): void {
  TestBed.configureTestingModule(TESTING_MODULE_CONFIG).compileComponents();
}
