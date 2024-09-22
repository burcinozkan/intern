import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../pipe/services/product.service';
import { SupplierService } from './services/supplier.service';

@Component({
  selector: 'app-suppliers-page',
  templateUrl: './supplier-page.component.html',
  styleUrls: ['./supplier-page.component.scss']
})
export class SupplierPageComponent implements OnInit {


  products: Products[] = [];
  selectedProduct: Products | null = null;

  constructor(private productService: SupplierService) { }

  ngOnInit(): void {
    // Local storage'da veri yoksa dummy data yükleme
    this.productService.initializeDummyData();
    this.products = this.productService.getProducts();
  }

  editProduct(product: Products): void {
    this.selectedProduct = { ...product };
  }

  saveProduct(updatedProduct: Products): void {
    this.productService.saveProduct(updatedProduct);
    this.products = this.productService.getProducts();
    this.selectedProduct = null;
  }

  newProduct(): void {
    this.selectedProduct = { id: 0, name: '', price: 0, description: '' };
  }

}

export class Products {
  id: number;
  name: string;
  price: number;
  description: string;
}