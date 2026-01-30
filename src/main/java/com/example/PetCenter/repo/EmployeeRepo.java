package com.example.PetCenter.repo;

import com.example.PetCenter.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepo extends JpaRepository<Employee, Integer> {
    void deleteEmployeeByidemployee(int idemployee);

    Optional<Employee> findEmployeeByidemployee(int idemployee);

    Optional<Employee> findByEmailAndPassword(String email, String password);
}
