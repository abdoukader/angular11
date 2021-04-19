import { Component, Input, OnInit,EventEmitter, Output } from '@angular/core'; 
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() productsInput$:Observable<AppDataState<Product[]>> | null=null;
  //@Output() productsEventEmitter:EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  readonly DataStateEnum=DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }

  /*onSelect(p:Product){
    this.productsEventEmitter.emit(
      {type:ProductActionsTypes.SELECT_PRODUCTS,payload:p
      });
  }
  onDelete(p:Product){
    this.productsEventEmitter.emit(
      {type:ProductActionsTypes.DELETE_PRODUCTS,payload:p}
      );
  }
  onEdit(p:Product){
    this.productsEventEmitter.emit(
      {type:ProductActionsTypes.EDIT_PRODUCTS,payload:p}
      );
  }
  /*onActionEvent($event:ActionEvent){
    this.productsEventEmitter.emit($event);
  }*/
   

}
