import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.serice';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';
import { catchError, startWith } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productsService: ProductsService) { }
   
  products$: Observable<AppDataState<Product[]>>| null=null;
  readonly DataStateEnum=DataStateEnum;
   
  ngOnInit(): void {
  }

  onGetAllProducts(){
    this.products$ = this.productsService.getAllProducts().pipe(
      map(data=>({dataState: DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );


    /* 
    ------------------2em methode-------------------------

    this.productService.getAllProducts().subscribe(data=>{
      this.products=data;
    },err=>{
      console.log(err);
    })*/
  }
  onGetSelectedProducts(){
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map(data=>({dataState: DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );

  }
  onGetAvailableProducts(){
    this.products$ = this.productsService.getAvailableProducts().pipe(
      map(data=>({dataState: DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );

  }
  onSearch(dataForm: any){

    this.products$ = this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data=>({dataState: DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }
  onSelect(p:Product){
    this.productsService.select(p)
    .subscribe(data=>{
      p.selected=data.selected;
    })
  }

}
