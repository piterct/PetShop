import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html'
})
export class ProductsPageComponent implements OnInit {
  public products$: Observable<any[]>;
 

  constructor(private data: DataService) { }

  ngOnInit() {
    this.products$ = this.data.getProducts();

  }

}
