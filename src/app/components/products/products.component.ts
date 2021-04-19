import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.serice';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';
import { catchError, startWith } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EventDriverService } from 'src/app/state/event.driver.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productsService: ProductsService, private router:Router,private eventDriverService:EventDriverService) { }
   
  products$: Observable<AppDataState<Product[]>>| null=null;
  readonly DataStateEnum=DataStateEnum;
   
  ngOnInit(): void {
    this.eventDriverService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      this.onActionEvent(actionEvent);
    })
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

  onDelete(p:Product){
    let v=confirm("Etes vous sure?");
    if(v==true)
    this.productsService.deleteProduct(p)
    .subscribe(data=>{
      this.onGetAllProducts();
    })
  }

  onNewProduct(){
    this.router.navigateByUrl("/newProduct")
  }
  onEdit(p:Product){
    this.router.navigateByUrl("/editProduct/"+p.id);
  }
  onActionEvent($event:ActionEvent){
    switch($event.type){
      case ProductActionsTypes.GET_ALL_PRODUCTS: this.onGetAllProducts();break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts();break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts();break;
      case ProductActionsTypes.SEARCH_PRODUCTS:this.onSearch($event.payload);break;
      case ProductActionsTypes.New_PRODUCTS: this.onNewProduct();break;
      case ProductActionsTypes.SELECT_PRODUCTS:this.onSelect($event.payload);break;
      case ProductActionsTypes.DELETE_PRODUCTS:this.onDelete($event.payload);break;
      case ProductActionsTypes.EDIT_PRODUCTS:this.onEdit($event.payload);break;
    }
  }

}
 