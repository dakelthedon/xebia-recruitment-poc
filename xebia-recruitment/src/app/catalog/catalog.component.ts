import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {Book} from "../../entities/book";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  private _books: Book[];
  private _productService: ProductService;

  constructor(productService: ProductService) {
    this._productService = productService;
  }

  ngOnInit() {
    this._productService.getBooks().subscribe((books: Book[]) => {
      this._books = books;
    });
  }

}
