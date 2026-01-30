import { Inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Products } from "../../domain/products";

@Injectable({  
    providedIn: 'root'
})

export class ProductsService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}
    

    public getProducts(): Observable<Products[]>{
        return this.http.get<Products[]>(`${this.apiServerUrl}/products/all`);  
    }

    public addProducts(products: Products): Observable<Products>{
        return this.http.post<Products>(`${this.apiServerUrl}/products/add`, products);
    }

    public updateProducts(products: Products): Observable<Products>{
        return this.http.put<Products>(`${this.apiServerUrl}/products/update`, products);
    }

    public deleteProducts(productsId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/products/delete/${productsId}`);
    }

}    