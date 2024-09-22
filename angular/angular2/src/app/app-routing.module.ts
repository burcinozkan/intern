import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPageComponent } from './form-page/form-page.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { RoutingPageComponent } from './routing-page/routing-page.component';
import { HomeComponent } from './home/home.component';
import { PipePageComponent } from './pipe/pipe.component';
import { SupplierPageComponent } from './input-output/supplier-page.component';
import { DirectivePageComponent } from './directive-page/directive-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'forms', component: FormPageComponent },
  { path: 'services', component: ServicesPageComponent },
  { path: 'routing', component: RoutingPageComponent },
  { path: 'pipe', component: PipePageComponent },
  { path: 'inputOutput', component: SupplierPageComponent },
  { path: 'directive', component: DirectivePageComponent },
  { path: '**', redirectTo: '/home' } // Wildcard route: hatalı url için yönlendirme
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


