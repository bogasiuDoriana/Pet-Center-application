package com.example.PetCenter.repo;

import com.example.PetCenter.domain.Products;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductsRepo extends JpaRepository<Products, Integer> {
    void deleteProductsByIdproducts(Integer idproducts);
    Optional<Products> findByNameContainingIgnoreCase(String name);
    Optional<Products> findProductsByIdproducts(Integer idproducts);
}
