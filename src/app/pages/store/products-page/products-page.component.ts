import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable, empty } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { catchError, delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html'
})
export class ProductsPageComponent implements OnInit {
  public products$: Observable<Product[]>;


  constructor(private data: DataService, private toastr: ToastrService) { }

  ngOnInit() {
    this.products$ = this.data.getProducts().pipe
      (
        catchError(error => {
          this.toastr.error("Falha ao carregar os produtos!");
          return empty();
        })
      );
  }



}
