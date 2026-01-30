package com.example.PetCenter.domain;

//import javax.persistence.*;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "products")
public class Products implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idproducts;

    private String name;
    private Double price;
    private Integer stock;
    private String category;

    public Products() {
    }

    public Products(Integer idproducts, String name, Double price, Integer stock, String category) {
        this.idproducts = idproducts;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.category = category;
    }

    public Integer getIdproducts() {
        return idproducts;
    }

    public void setIdproducts(Integer idproducts) {
        this.idproducts = idproducts;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
