import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Supplier } from '../models/supplier.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Products } from '../supplier-page.component';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {

  

  @Input() products: Products;
  @Output() save = new EventEmitter<Products>();

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.productForm.patchValue(this.products);
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.save.emit(this.productForm.value);
    }
  }

}
