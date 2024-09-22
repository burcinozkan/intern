import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormPageComponent } from './form-page/form-page.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './services-page/services/services';
import { RoutingPageComponent } from './routing-page/routing-page.component';
import { HomeComponent } from './home/home.component';
import { PipePageComponent } from './pipe/pipe.component';
import { KdvPipe } from './pipe/product-pipe/kdv.pipe';
import { SupplierPageComponent } from './input-output/supplier-page.component';
import { SupplierListComponent } from './input-output/supplier-list/supplier-list.component';
import { DirectivePageComponent } from './directive-page/directive-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FormPageComponent,
    ServicesPageComponent,
    RoutingPageComponent,
    HomeComponent,
    PipePageComponent,
    KdvPipe,
    SupplierPageComponent,
    SupplierListComponent,
    DirectivePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // ReactiveFormsModule'ü burada ekleyin
    HttpClientModule // HttpClientModule'ü burada ekliyoruz
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
