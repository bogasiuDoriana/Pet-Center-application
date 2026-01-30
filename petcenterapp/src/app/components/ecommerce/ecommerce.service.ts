import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EcommerceService {
  private apiUrl = 'http://localhost:8080/products';
  private products: Array<any> = [];

  private cart: Array<{ product: any; qty: number }> = [];

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.products.slice();
  }

  loadProductsFromApi() {
    return this.http.get<Array<any>>(`${this.apiUrl}/all`).toPromise().then((data) => {
      this.products = (data || []).map((p) => ({
        id: p.idproducts,
        name: p.name,
        price: p.price,
        stock: p.stock,
        category: p.category || 'Uncategorized',
      }));
      return this.products;
    }).catch((error) => {
      console.error('Error loading products:', error);
      return [];
    });
  }

  sortProducts(products: Array<any>, sortBy: string): Array<any> {
    const sorted = products.slice();
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  }

  getCategories(): Array<string> {
    const categories = new Set(this.products.map((p) => p.category));
    return Array.from(categories).sort();
  }

  addToCart(product: any) {
    const item = this.cart.find((i) => i.product.id === product.id);
    if (item) {
      item.qty += 1;
    } else {
      this.cart.push({ product, qty: 1 });
    }
  }

  removeFromCart(item: { product: any; qty: number }) {
    const idx = this.cart.indexOf(item);
    if (idx > -1) this.cart.splice(idx, 1);
  }

  // Increase quantity for a product (alias to addToCart)
  increaseQuantity(product: any) {
    this.addToCart(product);
  }

  // Decrease quantity; remove item if qty falls to 0
  decreaseQuantity(product: any) {
    const item = this.cart.find((i) => i.product.id === product.id);
    if (item) {
      item.qty -= 1;
      if (item.qty <= 0) {
        this.cart = this.cart.filter((i) => i.product.id !== product.id);
      }
    }
  }

  // Set explicit quantity for a product (adds product if missing and qty>0)
  setQuantity(productId: number, qty: number) {
    if (qty <= 0) {
      this.cart = this.cart.filter((i) => i.product.id !== productId);
      return;
    }
    const item = this.cart.find((i) => i.product.id === productId);
    if (item) {
      item.qty = qty;
    } else {
      const prod = this.products.find((p) => p.id === productId);
      if (prod) {
        this.cart.push({ product: prod, qty });
      }
    }
  }

  getCart() {
    return this.cart.slice();
  }

  clearCart() {
    this.cart = [];
  }

  total() {
    return this.cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  }

  processPayment(
    paymentDetails: any,
    amount: number,
    cart: Array<any>
  ): { success: boolean; message: string } {
    try {
      // Validate payment details
      if (
        !paymentDetails.cardNumber ||
        !paymentDetails.cardName ||
        !paymentDetails.expiryDate ||
        !paymentDetails.cvv
      ) {
        return { success: false, message: 'All payment fields are required' };
      }

      // Simulate payment processing
      console.log('Processing payment...');
      console.log('Amount: $' + amount.toFixed(2));
      console.log('Card: ' + paymentDetails.cardName);
      console.log('Cart items:', cart);

      // Simulate a successful payment (90% success rate)
      const isSuccessful = Math.random() > 0.1;

      if (isSuccessful) {
        // Clear cart after successful payment
        this.clearCart();
        return {
          success: true,
          message: `Payment of $${amount.toFixed(2)} completed successfully!`,
        };
      } else {
        return {
          success: false,
          message: 'Payment failed. Please try again or use a different card.',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while processing payment',
      };
    }
  }

  // CRUD Operations for Products
  addProduct(product: any) {
    const payload = {
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category || 'Food',
    };
    console.log('Adding product:', payload);
    return this.http.post<any>(`${this.apiUrl}/add`, payload).toPromise().catch((error) => {
      console.error('API Error:', error);
      throw new Error(error?.error?.message || error?.message || 'Failed to add product');
    });
  }

  updateProduct(product: any) {
    const payload = {
      idproducts: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category || 'Food',
    };
    console.log('Updating product:', payload);
    return this.http.put<any>(`${this.apiUrl}/update`, payload).toPromise().catch((error) => {
      console.error('API Error:', error);
      throw new Error(error?.error?.message || error?.message || 'Failed to update product');
    });
  }

  deleteProduct(id: number) {
    console.log('Deleting product:', id);
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`).toPromise().catch((error) => {
      console.error('API Error:', error);
      throw new Error(error?.error?.message || error?.message || 'Failed to delete product');
    });
  }
  

  getProductById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/find/${id}`).toPromise();
  }

  getAnimals() {
  return this.http
    .get<Array<any>>('http://localhost:8080/pet_adoption/animals')
    .toPromise()
    .then(data => data || [])
    .catch(err => {
      console.error('Error loading animals', err);
      return [];
    });
}

}
