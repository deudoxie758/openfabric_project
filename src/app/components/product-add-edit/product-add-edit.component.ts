import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css'],
})
export class ProductAddEditComponent implements OnInit {
  productForm: FormGroup;
  isEditing: boolean;
  productId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isEditing = false;

    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.isEditing = true;
        this.productId = parseInt(params.get('id') || '0', 10);
        this.getProduct();
      }
    });
  }

  getProduct(): void {
    this.productService.getProduct(this.productId).subscribe(
      (data) => {
        this.productForm.patchValue(data);
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      if (this.isEditing) {
        this.productService
          .updateProduct(this.productId, this.productForm.value)
          .subscribe(
            () => {
              this.router.navigate(['/products']);
            },
            (error) => {
              console.error('Error updating product:', error);
            }
          );
      } else {
        this.productService.addProduct(this.productForm.value).subscribe(
          () => {
            this.router.navigate(['/products']);
          },
          (error) => {
            console.error('Error adding product:', error);
          }
        );
      }
    }
  }
}
