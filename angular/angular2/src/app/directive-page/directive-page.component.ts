import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-directive-page',
  templateUrl: './directive-page.component.html',
  styleUrls: ['./directive-page.component.scss']
})
export class DirectivePageComponent implements OnInit {


  @ViewChild('electronicsTemplate', { static: true }) electronicsTemplate: TemplateRef<any>;
  @ViewChild('clothingTemplate', { static: true }) clothingTemplate: TemplateRef<any>;


  isActive: boolean = false;
  toggleNgClassOneMoreDiv: boolean = false;
  isActiveNgStyle: boolean = false;

  constructor() { }

  products: Product[] = [
    { type: 'electronics', name: 'Laptop', price: 1500 },
    { type: 'clothing', name: 'T-Shirt', price: 25 },
    { type: 'electronics', name: 'Smartphone', price: 700 },
    { type: 'clothing', name: 'Jeans', price: 50 }
  ];


  getTemplate(type: string) {
    return type === 'electronics' ? this.electronicsTemplate : this.clothingTemplate;
  }


  ngOnInit(): void {
  }

  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  isVisible = true;

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
  toggleNgClassOneMore() {
    this.toggleNgClassOneMoreDiv = !this.toggleNgClassOneMoreDiv;
  }

  toggleNgClass() {
    this.isActive = !this.isActive;
  }

  toggleNgStyleClass() {
    this.isActiveNgStyle = !this.isActiveNgStyle;
  }

}


export class Product {
  type: string;
  name: string;
  price: number;
}