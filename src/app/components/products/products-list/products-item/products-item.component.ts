
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {

@Input() product:Product | null=null;  
@Output() eventEmitter:EventEmitter<ActionEvent>=new EventEmitter<ActionEvent>();
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(product:Product){
    this.eventEmitter.emit({
      type:ProductActionsTypes.SELECT_PRODUCTS,payload:product
    });
  }
  onDelete(product:Product){
    this.eventEmitter.emit({
      type:ProductActionsTypes.DELETE_PRODUCTS,payload:product
    });
  }
  onEdit(product:Product){
    this.eventEmitter.emit({
      type:ProductActionsTypes.EDIT_PRODUCTS ,payload:product
    });

  }
   
}
