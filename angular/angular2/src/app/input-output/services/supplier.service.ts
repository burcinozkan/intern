import { Injectable } from '@angular/core';
import { Supplier } from '../models/supplier.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Products } from '../supplier-page.component';

@Injectable({
    providedIn: 'root'
})
export class SupplierService {

    private localStorageKey = 'suppliers';
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    // getSuppliers(): Observable<Supplier[]> {
    //     return this.http.get<Supplier[]>(`${this.apiUrl}Suppliers`);
    // }

    // saveSuppliersToLocalStorage(suppliers: Supplier[]): void {
    //     localStorage.setItem('suppliers', JSON.stringify(suppliers));
    // }

    // getSuppliersFromLocalStorage(): Supplier[] {
    //     const suppliers = localStorage.getItem('suppliers');
    //     return suppliers ? JSON.parse(suppliers) : [];
    // }

    // saveSuppliers(suppliers: Supplier[]): void {
    //     localStorage.setItem(this.localStorageKey, JSON.stringify(suppliers));
    // }


    // Local storage'dan ürünleri alma


    getProducts(): Products[] {
        const products = localStorage.getItem(this.localStorageKey);
        return products ? JSON.parse(products) : [];
    }

    // Local storage'a ürünleri kaydetme
    saveProducts(products: Products[]): void {
        localStorage.setItem(this.localStorageKey, JSON.stringify(products));
    }

    // Ürün ekleme veya güncelleme
    saveProduct(product: Products): void {
        const products = this.getProducts();
        const index = products.findIndex(p => p.id === product.id);
        if (index !== -1) {
            // Güncelleme
            products[index] = product;
        } else {
            // Yeni ürün ekleme
            products.push(product);
        }
        this.saveProducts(products);
    }

    // Local storage'da veri yoksa dummy data ekleme
    initializeDummyData(): void {
        const dummyProducts: Products[] = [
            { id: 1, name: 'Product 1', price: 100, description: 'Description 1' },
            { id: 2, name: 'Product 2', price: 200, description: 'Description 2' },
            { id: 3, name: 'Product 3', price: 300, description: 'Description 3' },
            { id: 4, name: 'Product 4', price: 400, description: 'Description 4' },
            { id: 5, name: 'Product 5', price: 500, description: 'Description 5' },
        ];
        if (!localStorage.getItem(this.localStorageKey)) {
            this.saveProducts(dummyProducts);
        }
    }
}

