package com.example.PetCenter.repo;

import com.example.PetCenter.domain.PetAdoption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetAdoptionRepo extends JpaRepository<PetAdoption, Integer> {

    List<PetAdoption> findByStatus(PetAdoption.Status status);

    boolean existsByIdanimalAndStatus(Integer idanimal, PetAdoption.Status status);
}
