import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from './productsService';
import { Products } from '../../domain/products';
import { HttpErrorResponse } from '@angular/common/http';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsComponent implements OnInit {
  public products: Products[] = [];
  public loading: boolean = true;
  public error: string = '';
  public editProducts: Products | null = null;
  public deleteProducts: Products | null = null;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(): void {
    this.loading = true;
    this.error = '';  

   this.productsService.getProducts().subscribe({
      next: (response: Products[]) => {
        this.products = response;
        this.loading = false;
        console.log('Products loaded:', response);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.error = error.message;
        console.error('Error loading products:', error);

        if (error.status === 404) {
          this.error = 'API endpoint not found. Please check if the backend server is running.';
        } else if (error.status === 0) {
          this.error = 'Cannot connect to server. Make sure your backend is running on localhost:8080';
        } else {
          this.error = `Error: ${error.message}`;
        }
      }
    });
  }

  public searchProducts(key: string): void {
    const result: Products[] = [];
        for (const product of this.products) {
          if (product.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
            result.push(product);
          } 
        }
        this.products = result;
        if (result.length === 0 || !key) {
          this.getProducts();
        } 
  }


  public onOpenModal(products: Products | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      const modal = new Modal(document.getElementById('addProductModal')!);
      modal.show();
    } 
    else if (mode === 'edit') {
      this.editProducts = products ? {...products} : null; // Create a copy
      const modal = new Modal(document.getElementById('updateProductModal')!);
      modal.show();
    } 
    else if (mode === 'delete') {
      this.deleteProducts = products ? {...products} : null;
      const modal = new Modal(document.getElementById('deleteProductModal')!);
      modal.show();
    }
    container?.appendChild(button);
    button.click();
  }


  public onAddProducts(addForm: any): void {
    document.getElementById('add-animal-form')?.click();
          this.productsService.addProducts(addForm.value).subscribe(
            (response: Products) => {
              console.log(response);
              this.getProducts();
              addForm.reset();
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
              addForm.reset();
            }
          );
  }

  public onUpdateProducts(): void {
    if (!this.editProducts)  return;

    this.productsService.updateProducts(this.editProducts).subscribe({
      next: () => this.getProducts(),
      error: err => alert(err.message)
    });
  }

  public onDeleteProducts(): void{
  if (!this.deleteProducts?.idproducts) return;

  this.productsService.deleteProducts(this.deleteProducts.idproducts).subscribe({
    next: () => {
      const modalEl = document.getElementById('deleteProductModal');
      if (modalEl) {
        const modal = Modal.getInstance(modalEl);
        if (modal) {
          modal.hide();
        }
      }

      this.getProducts();
      this.deleteProducts = null;
    },
    error: (err) => {
      alert(err.message);
      const modalEl = document.getElementById('deleteProductModal');
      if (modalEl) {
        const modal = Modal.getInstance(modalEl);
        if (modal) {
          modal.hide();
        }
      }
    }
  });

}
  
}

// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { ProductsService } from './productsService';
// import { Products } from '../../domain/products';
// import { HttpErrorResponse } from '@angular/common/http';

// interface CartItem {
//   product: Products;
//   qty: number;
// }

// interface PaymentDetails {
//   cardNumber: string;
//   cardName: string;
//   expiryDate: string;
//   cvv: string;
// }

// @Component({
//   selector: 'app-products',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './products.html',
//   styleUrls: ['./products.css'],
// })
// export class ProductsComponent implements OnInit {
//   // Product lists
//   public allProducts: Products[] = [];
//   public products: Products[] = [];

//   // Admin Panel
//   public showAdminPanel = false;
//   public showAddProductForm = false;
//   public editingProduct: Products | null = null;
//   public newProduct: Products = this.resetNewProduct();
//   public crudMessage = '';

//   // Search, filter, sort
//   public searchQuery = '';
//   public categories = ['Food', 'Toys', 'Accessories', 'Other'];
//   public selectedCategory: string | null = null;
//   public priceFilter = { min: 0, max: 1000 };
//   public sortBy = 'name';

//   // Cart & Payment
//   public cart: CartItem[] = [];
//   public showPaymentForm = false;
//   public paymentDetails: PaymentDetails = {
//     cardNumber: '',
//     cardName: '',
//     expiryDate: '',
//     cvv: '',
//   };
//   public paymentStatus = '';

//   constructor(private productsService: ProductsService) {}

//   ngOnInit(): void {
//     this.getProducts();
//   }

//   // -----------------------
//   // Products CRUD
//   // -----------------------
//   public getProducts(): void {
//     this.productsService.getProducts().subscribe({
//       next: (response: Products[]) => {
//         this.allProducts = response;
//         this.products = [...response];
//       },
//       error: (error: HttpErrorResponse) => {
//         console.error(error);
//       },
//     });
//   }

//   public toggleAdminPanel(): void {
//     this.showAdminPanel = !this.showAdminPanel;
//   }

//   public openAddProductForm(): void {
//     this.showAddProductForm = true;
//     this.editingProduct = null;
//     this.newProduct = this.resetNewProduct();
//   }

//   public openEditProductForm(product: Products): void {
//     this.showAddProductForm = true;
//     this.editingProduct = { ...product };
//     this.newProduct = { ...product };
//   }

//   public resetProductForm(): void {
//     this.showAddProductForm = false;
//     this.editingProduct = null;
//     this.newProduct = this.resetNewProduct();
//   }

//   private resetNewProduct(): Products {
//     return {
//       idproducts: 0,
//       name: '',
//       price: 0,
//       stock: 0,
//       category: 'Other',
//     };
//   }

//   public saveProduct(): void {
//     if (this.editingProduct) {
//       // Update
//       this.productsService.updateProducts(this.newProduct).subscribe({
//         next: () => {
//           this.crudMessage = '✅ Product updated successfully!';
//           this.resetProductForm();
//           this.getProducts();
//         },
//         error: (err) => (this.crudMessage = `❌ ${err.message}`),
//       });
//     } else {
//       // Add
//       this.productsService.addProducts(this.newProduct).subscribe({
//         next: () => {
//           this.crudMessage = '✅ Product added successfully!';
//           this.resetProductForm();
//           this.getProducts();
//         },
//         error: (err) => (this.crudMessage = `❌ ${err.message}`),
//       });
//     }
//   }

//   public deleteProduct(product: Products): void {
//     this.productsService.deleteProducts(product.idproducts).subscribe({
//       next: () => {
//         this.crudMessage = '✅ Product deleted successfully!';
//         this.getProducts();
//       },
//       error: (err) => (this.crudMessage = `❌ ${err.message}`),
//     });
//   }

//   // -----------------------
//   // Search / Filter / Sort
//   // -----------------------
//   public onSearch(): void {
//     let filtered = [...this.allProducts];
//     if (this.searchQuery) {
//       filtered = filtered.filter((p) =>
//         p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
//       );
//     }
//     if (this.selectedCategory) {
//       filtered = filtered.filter((p) => p.category === this.selectedCategory);
//     }
//     filtered = filtered.filter(
//       (p) => p.price >= this.priceFilter.min && p.price <= this.priceFilter.max
//     );

//     // Sort
//     if (this.sortBy === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
//     else if (this.sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
//     else if (this.sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);

//     this.products = filtered;
//   }

//   public onCategoryChange(): void {
//     this.onSearch();
//   }

//   public onPriceFilterChange(): void {
//     this.onSearch();
//   }

//   public onSortChange(): void {
//     this.onSearch();
//   }

//   // -----------------------
//   // Cart
//   // -----------------------
//   public addToCart(p: Products): void {
//     const item = this.cart.find((i) => i.product.idproducts === p.idproducts);
//     if (item) item.qty += 1;
//     else this.cart.push({ product: p, qty: 1 });
//   }

//   public increase(item: CartItem): void {
//     item.qty += 1;
//   }

//   public decrease(item: CartItem): void {
//     if (item.qty > 1) item.qty -= 1;
//   }

//   public editQuantity(item: CartItem): void {
//     const qty = parseInt(prompt('Enter new quantity:', item.qty.toString()) || '0', 10);
//     if (qty > 0) item.qty = qty;
//   }

//   public remove(item: CartItem): void {
//     this.cart = this.cart.filter((i) => i !== item);
//   }

//   public clear(): void {
//     this.cart = [];
//     this.showPaymentForm = false;
//     this.paymentStatus = '';
//   }

//   public total(): number {
//     return this.cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);
//   }

//   // -----------------------
//   // Payment
//   // -----------------------
//   public initiatePayment(): void {
//     this.showPaymentForm = true;
//   }

//   public cancelPayment(): void {
//     this.showPaymentForm = false;
//   }

//   public finalizePayment(): void {
//     // Dummy payment logic
//     if (
//       this.paymentDetails.cardNumber.length === 16 &&
//       this.paymentDetails.cvv.length === 3 &&
//       this.paymentDetails.cardName &&
//       this.paymentDetails.expiryDate
//     ) {
//       this.paymentStatus = '✅ Payment successful!';
//       this.clear();
//     } else {
//       this.paymentStatus = '❌ Payment failed. Check your card details.';
//     }
//   }
// }

  