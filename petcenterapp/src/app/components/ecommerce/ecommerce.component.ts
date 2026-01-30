import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EcommerceService } from './ecommerce.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.html',
  styleUrls: ['./ecommerce.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class EcommerceComponent implements OnInit {
  allProducts: Array<any> = [];
  products: Array<any> = [];
  cart: Array<any> = [];
  paymentStatus: string = '';
  showPaymentForm: boolean = false;
  searchQuery: string = '';
  sortBy: string = 'name';
  selectedCategory: string = 'All';
  categories: Array<string> = [];
  priceFilter: { min: number; max: number } = { min: 0, max: 1000 };
  showAdminPanel: boolean = false;
  showAddProductForm: boolean = false;
  editingProduct: any = null;
  newProduct = {
    id: null,
    name: '',
    price: 0,
    stock: 0,
    category: 'Food',
  };
  crudMessage: string = '';
  paymentDetails = {
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  };
  idowner: number | null = null;
  animals: any[] = [];
  showAnimals: boolean = true;

  constructor(private svc: EcommerceService, private router: Router) {}

  ngOnInit() {
    this.svc.loadProductsFromApi().then((products) => {
      this.allProducts = products;
      this.categories = ['All', ...this.svc.getCategories()];
      this.products = this.allProducts;
    });

    this.svc.getAnimals().then(data => {
        this.animals = data;
      });

    this.cart = this.svc.getCart();
    this.idowner = Number(new URLSearchParams(window.location.search).get('ownerId')) || null;
    
  }

  addToCart(product: any) {
    this.svc.addToCart(product);
    this.cart = this.svc.getCart();
  }

  remove(item: any) {
    this.svc.removeFromCart(item);
    this.cart = this.svc.getCart();
  }

  // Increase quantity for an item
  increase(item: any) {
    this.svc.increaseQuantity(item.product);
    this.cart = this.svc.getCart();
  }

  // Decrease quantity for an item (removes if reaches 0)
  decrease(item: any) {
    this.svc.decreaseQuantity(item.product);
    this.cart = this.svc.getCart();
  }

  // Prompt for new quantity to modify an item
  editQuantity(item: any) {
    const current = item.qty || 0;
    const input = window.prompt(`Set quantity for ${item.product.name}:`, String(current));
    if (input === null) return; // cancelled
    const qty = parseInt(input.trim(), 10);
    if (!isNaN(qty)) {
      this.svc.setQuantity(item.product.id, qty);
      this.cart = this.svc.getCart();
    }
  }

  clear() {
    this.svc.clearCart();
    this.cart = this.svc.getCart();
  }

  total() {
    return this.svc.total();
  }

  onSearch() {
    this.applyFiltersAndSort();
  }

  onPriceFilterChange() {
    this.applyFiltersAndSort();
  }

  onSortChange() {
    this.applyFiltersAndSort();
  }

  onCategoryChange() {
    this.applyFiltersAndSort();
  }

  private applyFiltersAndSort() {
    // Start with all products
    let filtered = this.allProducts.slice();

    // Apply category filter
    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === this.selectedCategory);
    }

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(query)
      );
    }

    // Apply price filter
    filtered = filtered.filter(
      (p) => p.price >= this.priceFilter.min && p.price <= this.priceFilter.max
    );

    // Apply sorting
    filtered = this.svc.sortProducts(filtered, this.sortBy);

    this.products = filtered;
  }

  initiatePayment() {
    if (this.cart.length === 0) {
      this.paymentStatus = 'error: Cart is empty';
      return;
    }
    this.showPaymentForm = true;
    this.paymentStatus = '';
  }

  finalizePayment() {
    if (!this.validatePaymentDetails()) {
      this.paymentStatus = 'error: Please fill all payment fields correctly';
      return;
    }
    
    const result = this.svc.processPayment(
      this.paymentDetails,
      this.total(),
      this.cart
    );

    if (result.success) {
      this.paymentStatus = 'success: Payment completed successfully!';
      this.cart = this.svc.getCart();
      this.resetPaymentForm();
    } else {
      this.paymentStatus = 'error: ' + result.message;
    }
  }

  cancelPayment() {
    this.showPaymentForm = false;
    this.resetPaymentForm();
    this.paymentStatus = '';
  }

  private validatePaymentDetails(): boolean {
    return (
        this.paymentDetails.cardNumber.length === 16 &&
        this.paymentDetails.cardName.trim().length > 0 &&
        /^\d{2}\/\d{2}$/.test(this.paymentDetails.expiryDate) &&
        this.paymentDetails.cvv.length === 3
    );
  }

  private resetPaymentForm() {
    this.paymentDetails = {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    };
    this.showPaymentForm = false;
  }

  // CRUD Operations for Products
  toggleAdminPanel() {
    this.showAdminPanel = !this.showAdminPanel;
    this.showAddProductForm = false;
    this.editingProduct = null;
  }

  openAddProductForm() {
    this.showAddProductForm = true;
    this.editingProduct = null;
    this.newProduct = { id: null, name: '', price: 0, stock: 0, category: 'Food' };
  }

  openEditProductForm(product: any) {
    this.editingProduct = product;
    this.newProduct = { ...product };
    this.showAddProductForm = true;
  }

  saveProduct() {
    // Trim whitespace from name
    const trimmedName = this.newProduct.name ? this.newProduct.name.trim() : '';
    
    if (!trimmedName) {
      this.crudMessage = 'error: Product name is required';
      return;
    }
    
    if (this.newProduct.price === null || this.newProduct.price === undefined || this.newProduct.price <= 0) {
      this.crudMessage = 'error: Price must be greater than 0';
      return;
    }
    
    if (this.newProduct.stock === null || this.newProduct.stock === undefined || this.newProduct.stock < 0) {
      this.crudMessage = 'error: Stock cannot be negative';
      return;
    }

    // Update the name with trimmed value
    const productToSave = {
      name: trimmedName,
      price: Number(this.newProduct.price),
      stock: Number(this.newProduct.stock),
      category: this.newProduct.category || 'Food',
    };

    // For updates, include the ID
    if (this.editingProduct) {
      (productToSave as any).id = this.editingProduct.id;
    }

    if (this.editingProduct) {
      // Update product
      this.svc.updateProduct({ ...productToSave, id: this.editingProduct.id })
        .then((response) => {
          console.log('Product updated:', response);
          this.crudMessage = 'success: Product updated successfully!';
          this.resetProductForm();
          this.svc.loadProductsFromApi().then((products) => {
            this.allProducts = products;
            this.applyFiltersAndSort();
          });
        })
        .catch((error) => {
          console.error('Error updating product:', error);
          this.crudMessage = 'error: ' + (error?.message || 'Failed to update product');
        });
    } else {
      // Add new product
      this.svc.addProduct(productToSave)
        .then((response) => {
          console.log('Product added:', response);
          this.crudMessage = 'success: Product added successfully!';
          this.resetProductForm();
          this.svc.loadProductsFromApi().then((products) => {
            this.allProducts = products;
            this.applyFiltersAndSort();
          });
        })
        .catch((error) => {
          console.error('Error adding product:', error);
          this.crudMessage = 'error: ' + (error?.message || 'Failed to add product');
        });
    }
  }

  deleteProduct(product: any) {
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
      this.svc.deleteProduct(product.id)
        .then(() => {
          this.crudMessage = 'success: Product deleted successfully!';
          this.svc.loadProductsFromApi().then((products) => {
            this.allProducts = products;
            this.applyFiltersAndSort();
          });
        })
        .catch((error) => {
          this.crudMessage = 'error: Failed to delete product';
          console.error(error);
        });
    }
  }

  public resetProductForm() {
    this.showAddProductForm = false;
    this.editingProduct = null;
    this.newProduct = { id: null, name: '', price: 0, stock: 0, category: 'Food' };
    setTimeout(() => {
      this.crudMessage = '';
    }, 3000);
  }

  goToAdoptions() {
    this.router.navigate(['/adoptions-list'], { queryParams: { ownerId: this.idowner } });
  }
}
