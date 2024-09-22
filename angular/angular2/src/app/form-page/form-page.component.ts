import { Component, OnInit } from '@angular/core'; // Angular çekirdek modülünden bileşen ve yaşam döngüsü hook'u import ediyoruz.
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms'; // Reactive Forms için gerekli modülleri import ediyoruz.

@Component({
  selector: 'app-form-page', // Bu bileşeni uygulama içinde kullanmak için seçici adı belirtiyoruz.
  templateUrl: './form-page.component.html', // Bileşenin HTML şablonunu belirtiyoruz.
  styleUrls: ['./form-page.component.scss'] // Bileşenin stil dosyasını belirtiyoruz.
})
export class FormPageComponent implements OnInit {
  // FormGroup: Reactive form'un ana yapısını oluşturur.
  myForm: FormGroup; // Form kontrol grubu. Formdaki tüm kontrolleri içerir.

  // savedForms: Kaydedilen form verilerini tutmak için bir dizi.
  savedForms: any[] = [];

  // editingIndex: Düzenlenen formun indeksini tutar. Eğer null ise yeni form ekleniyor demektir.
  editingIndex: number | null = null;

  // FormBuilder: Form oluşturmayı kolaylaştıran bir servis.
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Reactive form'u başlatıyoruz.
    this.myForm = this.fb.group({
      // FormControl: Form içinde tek bir alanı temsil eder.
      name: ['', Validators.required], // Ad alanı, zorunlu
      email: ['', [Validators.required, Validators.email]], // E-posta alanı, zorunlu ve geçerli bir e-posta olmalı
      // FormArray: Dinamik olarak artıp azalabilen form alanlarını temsil eder.
      phones: this.fb.array([
        this.fb.control('') // FormArray içinde ilk boş telefon numarası kontrolü
      ])
    });

    // Kaydedilen formları localStorage'dan yüklüyoruz.
    this.loadForms();
  }

  // FormGroup içindeki herhangi bir kontrolü döner.
  getControl(controlName: string) {
    // Belirtilen isimdeki form kontrolünü döner.
    return this.myForm.get(controlName);
  }

  // FormArray içindeki FormControl'leri döner.
  get phones(): FormArray {
    // FormArray'deki telefon numarası kontrollerini döner.
    return this.myForm.get('phones') as FormArray;
  }

  // FormArray'e yeni bir FormControl ekler.
  addPhone(): void {
    // Telefon numarası eklemek için yeni bir FormControl ekliyoruz.
    this.phones.push(this.fb.control(''));
  }

  // FormArray'den bir FormControl kaldırır.
  removePhone(index: number): void {
    // Belirtilen indeksteki telefon numarası kontrolünü kaldırıyoruz.
    this.phones.removeAt(index);
  }

  // Formu kaydetme işlemi
  save(): void {
    // Form geçerli ise
    if (this.myForm.valid) {
      const formValue = this.myForm.value; // Form değerlerini alıyoruz.

      if (this.editingIndex !== null) {
        // Düzenleme işlemi yapılıyorsa
        this.savedForms[this.editingIndex] = formValue; // Mevcut formu güncelliyoruz.
        this.editingIndex = null; // Düzenleme indeksini sıfırlıyoruz.
      } else {
        // Yeni form ekleme işlemi yapılıyorsa
        this.savedForms.push(formValue); // Yeni formu kaydediyoruz.
      }

      // Kaydedilen formları localStorage'a yazıyoruz.
      localStorage.setItem('forms', JSON.stringify(this.savedForms));
      this.myForm.reset(); // Formu sıfırlıyoruz.
      this.loadForms(); // Kaydedilen formları yeniden yüklüyoruz.

      // İlk telefon numarası kontrolü hariç diğerlerini temizleme
      while (this.phones.length > 1) {
        this.phones.removeAt(1);
      }

    }
  }

  // Kaydedilen formları localStorage'dan yükler.
  loadForms(): void {
    const saved = localStorage.getItem('forms'); // localStorage'dan formları alıyoruz.
    if (saved) {
      this.savedForms = JSON.parse(saved); // JSON formatındaki veriyi diziye çeviriyoruz.
    }
  }

  // Belirtilen indeksteki formu düzenleme işlemi
  edit(index: number): void {
    const form = this.savedForms[index]; // Düzenlenecek formu alıyoruz.
    this.myForm.patchValue(form); // Form değerlerini mevcut forma yüklüyoruz.
    this.editingIndex = index; // Düzenlenen formun indeksini kaydediyoruz.

    // FormArray'ı düzenleme işlemi için sıfırla ve yeniden doldur
    this.phones.clear(); // Mevcut telefon numarası kontrollerini temizliyoruz.
    form.phones.forEach((phone: string) => {
      this.phones.push(this.fb.control(phone)); // Her telefon numarası için yeni bir FormControl ekliyoruz.
    });
  }

  // Belirtilen indeksteki formu silme işlemi
  delete(index: number): void {
    this.savedForms.splice(index, 1); // Belirtilen indeksteki formu diziden kaldırıyoruz.
    localStorage.setItem('forms', JSON.stringify(this.savedForms)); // Güncellenmiş formları localStorage'a yazıyoruz.
    this.loadForms(); // Kaydedilen formları yeniden yüklüyoruz.
  }
}
 