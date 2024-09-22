import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from './models/services-pages.model';
import { CategoryService } from './services/services';

@Component({
  selector: 'app-services',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent implements OnInit {
  categories: Category[] = [];
  categoryForm: FormGroup;
  editingIndex: number | null = null; // Düzenlenen kategorinin indeksini tutar
  errorMessage: string | null = null; // Hata mesajını tutar

  constructor(private fb: FormBuilder, private categoryService: CategoryService) { }

  ngOnInit(): void {
    // Reactive form oluşturuluyor
    this.categoryForm = this.fb.group({
      categoryId: [null],
      categoryName: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Kategorileri yükleme işlemi başlatılıyor
    this.loadCategories();
  }

  // Kategorileri API'den veya yerel depolamadan yükleme işlemi
  loadCategories(): void {
    const saved = localStorage.getItem('categories');
    if (saved) {
      this.categories = JSON.parse(saved); // JSON formatındaki veriyi nesneye çevir
    } else {
      this.categoryService.getCategories().subscribe(
        data => {
          this.categories = data;
          this.saveToLocalStorage(); // Yerel depolamaya kaydet
        },
        error => {
          this.errorMessage = error; // Hata mesajını güncelle
        }
      );
    }
  }

  // Kategori kaydetme işlemi
  saveCategory(): void {
    if (this.categoryForm.valid) {
      const formValue: Category = this.categoryForm.value;

      if (this.editingIndex !== null) {
        // Düzenleme işlemi varsa
        this.categories[this.editingIndex] = formValue; // Kategoriyi günceller
        this.editingIndex = null; // Düzenleme indeksini sıfırlar
      } else {
        // Yeni kategori ekleme işlemi
        formValue.categoryId = this.generateId(); // Yeni kategori için ID oluştur
        this.categories.push(formValue); // Yeni kategoriyi ekler
      }

      this.saveToLocalStorage(); // Yerel depolamaya kaydeder
      this.categoryForm.reset(); // Formu sıfırlar
    }
  }

  // Yeni bir kategori ID'si oluşturma
  generateId(): number {
    return this.categories.length > 0 ? Math.max(...this.categories.map(c => c.categoryId)) + 1 : 1;
  }

  // Kategori düzenleme işlemi
  editCategory(index: number): void {
    this.categoryForm.patchValue(this.categories[index]); // Formu düzenlenecek kategori ile doldurur
    this.editingIndex = index; // Düzenleme indeksini günceller
  }

  // Kategori silme işlemi
  deleteCategory(index: number): void {
    this.categories.splice(index, 1); // Kategoriyi diziden kaldırır
    this.saveToLocalStorage(); // Yerel depolamaya kaydeder
  }

  // Kategorileri yerel depolamaya kaydetme işlemi
  private saveToLocalStorage(): void {
    localStorage.setItem('categories', JSON.stringify(this.categories)); // Veriyi JSON formatına çevirerek kaydet
  }
}
