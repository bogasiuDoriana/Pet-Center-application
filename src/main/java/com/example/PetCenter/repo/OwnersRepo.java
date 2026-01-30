package com.example.PetCenter.repo;

import com.example.PetCenter.domain.Owners;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OwnersRepo extends JpaRepository<Owners, Integer>{

    void deleteOwnerByidowner(int idowner);
    Optional<Owners> findOwnerByidowner(int idowner);

    Optional<Owners> findByEmailAndPassword(String email, String password);
}
