package com.example.PetCenter.repo;

import com.example.PetCenter.domain.Animals;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface AnimalsRepo extends JpaRepository<Animals, Integer> {

    Optional<Animals> findByNameContainingIgnoreCase(String name);
    Optional<Animals> findAnimalByidanimal(int id);

    @Query(
            "SELECT a FROM Animals a " +
                    "WHERE a.idanimal NOT IN (" +
                    "   SELECT p.idanimal FROM PetAdoption p " +
                    "   WHERE p.status = com.example.PetCenter.domain.PetAdoption.Status.APPROVED" +
                    ")"
    )
    List<Animals> findAvailableAnimals();
}
