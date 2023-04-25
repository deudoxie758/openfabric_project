import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from '../app/components/product-list/product-list.component';
import { ProductDetailComponent } from '../app/components/product-details/product-details.component';
import { ProductAddEditComponent } from '../app/components/product-add-edit/product-add-edit.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'add-product', component: ProductAddEditComponent },
  { path: 'edit-product/:id', component: ProductAddEditComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
