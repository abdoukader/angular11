import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.serice';
import { EventDriverService } from 'src/app/state/event.driver.service';
import { ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productForm!:FormGroup;
  submitted:boolean=false;

  constructor(private fb:FormBuilder, private productsService:ProductsService, private eventDrivenService:EventDriverService) { }

  ngOnInit(): void {
    this.productForm=this.fb.group({
      name:["", Validators.required],
      price:[0, Validators.required],
      quantity:[0, Validators.required],
      selected:["true", Validators.required],
      available:["true", Validators.required]
    })
  }

  onSaveProduct(){
    this.submitted = true;
    if(this.productForm.invalid)return;
    this.productsService.save(this.productForm.value)
      .subscribe(data=>{
        this.eventDrivenService.publishEvent({type:ProductActionsTypes.PRODUCT_ADDED})
        alert("Success saving product")
      })
  }

}
