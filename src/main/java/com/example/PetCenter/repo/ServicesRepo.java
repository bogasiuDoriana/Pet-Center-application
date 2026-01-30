package com.example.PetCenter.repo;

import com.example.PetCenter.domain.Services;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ServicesRepo extends JpaRepository<Services, Integer> {
    Optional<Services> findServiceByidservices(int idservices);

    Optional<Services> findBynameContainingIgnoreCase(String name);
}
