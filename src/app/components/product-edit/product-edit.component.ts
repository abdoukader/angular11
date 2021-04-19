import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.serice';
import { EventDriverService } from 'src/app/state/event.driver.service';
import { ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productId:number;
  productForm?:FormGroup;
  submitted:boolean=false;

  constructor(private activatedRoute:ActivatedRoute, private productsService:ProductsService, private fb:FormBuilder, private eventDrivenService:EventDriverService) {
    this.productId=this.activatedRoute.snapshot.params.id;
   }

  ngOnInit(): void {
    this.productsService.getProduct(this.productId)
      .subscribe(product=>{
        this.productForm= this.fb.group({
          id:[product.id,Validators.required],
           name:[product.name,Validators.required],
           price:[product.price,Validators.required],
           quantity:[product.quantity,Validators.required],
           selected:[product.selected,Validators.required],
           available:[product.available,Validators.required],
        })
      })
  }
  onUpdateProduct(){
    this.productsService.updateProduct(this.productForm?.value)
      .subscribe(data=>{
        this.eventDrivenService.publishEvent({type:ProductActionsTypes.PRODUCT_UPDATED})
        alert("Success product update");
      })
  }

}
