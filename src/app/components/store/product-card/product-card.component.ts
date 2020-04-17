import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { Product } from 'src/app/models/product.model';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  constructor() { }

  ngOnInit(): void {
  }

  hideButton() {
    $("#addCart").hide();
  }


}


