package com.example.PetCenter.service;

import com.example.PetCenter.domain.Products;
import com.example.PetCenter.exception.UserNotFoundException;
import com.example.PetCenter.repo.ProductsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductsService {
    private final ProductsRepo productsRepo;

    @Autowired
    public ProductsService(ProductsRepo productsRepo) {
        this.productsRepo = productsRepo;
    }

    public Products addProduct(Products product) {
        return productsRepo.save(product);
    }

    public List<Products> findAllProducts() {
        return productsRepo.findAll();
    }

    public Products updateProduct(Products product) {
        return productsRepo.save(product);
    }

    @Transactional
    public void deleteProduct(Integer id) {
        productsRepo.deleteProductsByIdproducts(id);
    }

    public Products findProductById(Integer id) {
        return productsRepo.findProductsByIdproducts(id)
                .orElseThrow(() -> new UserNotFoundException("Product by id " + id + " was not found"));
    }
}
